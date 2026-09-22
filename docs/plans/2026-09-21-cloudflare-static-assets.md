# Cloudflare Static Assets Implementation Plan

> **For implementors:** Work through tasks using the executing-plans skill when human checkpoints are requested.

**Goal:** Prepare the existing Rust-generated site for an explicitly approved, preview-first Cloudflare deployment without changing live hosting or DNS.

**Architecture:** Wrangler serves `dist/` as static assets without a Worker script. Preserve extensionless, slashless URLs using `drop-trailing-slash`, use the generated `404.html`, and copy legacy redirects through `public/_redirects`. Netlify stays configured for rollback. Domain-level `www` redirects require a separate Cloudflare Redirect Rule at cutover; asset `_redirects` does not support host matching.

**Tech stack:** Rust SSG, Yarn 4, Node 22, Wrangler 4.136.1, Playwright request tests, Node's built-in test runner.

**Workspace:** `/Users/douglas/devel/hockeybuggy.com/.worktrees/cloudflare-static-assets`, branch `feature/cloudflare-static-assets`.

**Boundary:** No login, deployment, account changes, DNS changes, automatic deployment workflow, merge or push in this preparation step. Local preview and deployment dry-run only. The follow-on request to continue safely includes final local verification and a local feature-branch commit. No changes to generated site content or unrelated hosts.

## Task 1: Preview-only deployment configuration

Files:
- Create `cloudflare_tests/config.test.cjs`
- Create `wrangler.jsonc`, `.yarnrc.yml`
- Modify `package.json`, `yarn.lock`, `.gitignore`, `.node-version`
- Modify `.github/actions/shared-setup/action.yml`

1. Create this failing configuration guard:

```javascript
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');

test('keeps deployment assets-only on workers.dev', () => {
    const config = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'));
    assert.equal(config.workers_dev, true);
    assert.equal(config.assets.directory, './dist');
    for (const key of ['main', 'route', 'routes', 'env']) {
        assert.equal(config[key], undefined, `${key} requires a separate deployment review`);
    }
});
```

2. Run `node --test cloudflare_tests/config.test.cjs`; expect failure because `wrangler.jsonc` is absent.
3. Create `wrangler.jsonc`:

```json
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "hockeybuggy",
  "compatibility_date": "2026-09-21",
  "workers_dev": true,
  "send_metrics": false,
  "assets": {
    "directory": "./dist",
    "html_handling": "drop-trailing-slash",
    "not_found_handling": "404-page"
  }
}
```

4. Add scripts to `package.json`:

```json
"preview:cloudflare": "yarn build && wrangler dev --local --ip 127.0.0.1",
"deploy:cloudflare": "yarn build && wrangler deploy",
"test:cloudflare": "node --test cloudflare_tests/config.test.cjs && playwright test --config playwright.cloudflare.config.ts"
```

5. Run `yarn add --dev --exact wrangler@4.136.1`. Set `.node-version` to `22.22.3`; replace the CI shared setup's `node-version: 20.18.0` with `node-version-file: .node-version`. Create `.yarnrc.yml` containing `nodeLinker: node-modules` and remove `.yarnrc.yml` from `.gitignore`: the current Playwright version fails under Node 22 with Yarn 4.5.0 Plug'n'Play. Add `/.wrangler/`, `.dev.vars*` and `.env*` to `.gitignore` so runtime state and future credentials cannot be accidentally committed.
6. Run the configuration guard again, expecting PASS. The build is in both preview/deploy scripts rather than a Wrangler custom build watcher, avoiding a rebuild loop from generated files in `public/` and `dist/`.

Include in the final local commit: `Prepare Cloudflare static asset hosting`.

## Task 2: Preserve routing with real Cloudflare runtime tests

Files:
- Create `playwright.cloudflare.config.ts`
- Create `cloudflare_tests/assets.test.ts`
- Create `public/_redirects`
- Modify `.github/workflows/tests_and_linting.yml`

1. Create the test configuration:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './cloudflare_tests',
    testMatch: '**/assets.test.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    reporter: 'list',
    use: { baseURL: 'http://127.0.0.1:8788' },
    webServer: {
        command: 'yarn preview:cloudflare --port 8788',
        url: 'http://127.0.0.1:8788',
        reuseExistingServer: false,
        timeout: 180000,
        env: { WRANGLER_SEND_METRICS: 'false' },
    },
});
```

2. Create the request tests:

```typescript
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const netlifyConfig = readFileSync('netlify.toml', 'utf8');
const redirects = [...netlifyConfig.matchAll(
    /from = "([^"]+)"\s+to = "([^"]+)"\s+status = (\d+)/g,
)];
if (!redirects.length || redirects.length !== (netlifyConfig.match(/\[\[redirects\]\]/g) ?? []).length) {
    throw new Error('Update the legacy redirect parser to cover every Netlify redirect');
}

for (const [, from, to, status] of redirects) {
    test(`preserves legacy redirect ${from}`, async ({ request }) => {
        for (const suffix of ['', '/']) {
            const response = await request.get(`${from}${suffix}?source=migration`, { maxRedirects: 0 });
            expect(response.status()).toBe(Number(status));
            const target = new URL(response.headers().location, response.url());
            expect(target.origin).toBe(new URL(response.url()).origin);
            expect(target.pathname).toBe(to);
            expect(target.search).toBe('?source=migration');
            expect((await request.get(`${target.pathname}${target.search}`)).status()).toBe(200);
        }
    });
}

for (const path of ['/', '/blog', '/projects', '/blog/post/2020/05/switching-to-gatsby']) {
    test(`serves canonical page ${path}`, async ({ request }) => {
        const response = await request.get(path, { maxRedirects: 0 });
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('text/html');
    });
}

test('normalizes directory URLs without trailing slashes', async ({ request }) => {
    for (const path of ['/blog/', '/blog/index.html']) {
        const response = await request.get(path, { maxRedirects: 0 });
        expect(response.status()).toBe(307);
        expect(new URL(response.headers().location, response.url()).pathname).toBe('/blog');
    }
});

for (const [path, contentType] of [
    ['/styles/main.css', 'text/css'],
    ['/assets/nav.js', 'javascript'],
    ['/static/img/favicon.ico', 'image/'],
    ['/blog/index.xml', 'xml'],
    ['/sitemap.xml', 'xml'],
]) {
    test(`serves asset ${path}`, async ({ request }) => {
        const response = await request.get(path, { maxRedirects: 0 });
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain(contentType);
        if (path.endsWith('.xml')) {
            expect(await response.text()).toContain('https://hockeybuggy.com');
        }
    });
}

test('serves the custom 404 for missing resources', async ({ request }) => {
    for (const path of ['/missing-migration-page', '/blog/missing-migration-page', '/assets/missing.js', '/_redirects']) {
        const response = await request.get(path, { maxRedirects: 0 });
        expect(response.status()).toBe(404);
        expect(await response.text()).toBe(readFileSync('dist/404.html', 'utf8'));
    }
});
```

3. Run `yarn test:cloudflare --grep 'preserves legacy redirect'`. Expect 404 instead of 301 because no `_redirects` file exists yet.
4. Create `public/_redirects` by translating all 13 existing `netlify.toml` redirects verbatim into `source destination 301` lines. Add the trailing-slash form of each source as a second line pointing at the same destination. The following one-off command generates the complete file without new build tooling or dependencies:

```sh
node <<'JS'
const { readFileSync, writeFileSync } = require('node:fs');
const redirects = [...readFileSync('netlify.toml', 'utf8').matchAll(
    /from = "([^"]+)"\s+to = "([^"]+)"\s+status = (\d+)/g,
)];
if (redirects.length !== 13) throw new Error('Review the changed Netlify redirect list');
writeFileSync('public/_redirects', redirects.flatMap(([, from, to, status]) => [
    `${from} ${to} ${status}`,
    `${from}/ ${to} ${status}`,
]).join('\n') + '\n');
JS
```

5. Run `yarn test:cloudflare` against the actual local Wrangler asset runtime. This is the focused new hosting suite, not the full repository suite.
6. Add a step after the existing end-to-end tests in `.github/workflows/tests_and_linting.yml`:

```yaml
    - name: Test Cloudflare routing
      run: yarn test:cloudflare
```

7. Run `WRANGLER_SEND_METRICS=false yarn deploy:cloudflare --dry-run`; expect an assets-only deployment summary without login or upload. If Wrangler reports an error, resolve it locally; do not authenticate or deploy as a workaround.

Include in the final local commit: `Prepare Cloudflare static asset hosting`.

## Task 3: Document preview and cutover boundaries

File: `README.md`, deployment section only, plus update the Node dependency description to match the new requirement.

Document these exact preparation commands:

```sh
fnm use
corepack enable
yarn install --immutable
yarn preview:cloudflare
yarn test:cloudflare
WRANGLER_SEND_METRICS=false yarn deploy:cloudflare --dry-run
```

Document that `preview:cloudflare` builds once, serves locally at `http://127.0.0.1:8787`, and must be restarted after source changes. Test runtime uses port 8788 and cannot reuse an unrelated server. A real deployment requires explicit approval, then `yarn wrangler login` and `yarn deploy:cloudflare`; this publishes to the account's `workers.dev` subdomain only. Confirm account/Worker name before the first deployment to avoid overwriting an existing Worker. No CI auto-deployment is configured.

For a separately approved cutover: test the remote preview's pages, assets, feed, sitemap, legacy redirects, custom 404 and slash behavior; configure a Free Single Redirect matching `(http.host in {"hockeybuggy.com" "www.hockeybuggy.com"} and (http.host eq "www.hockeybuggy.com" or not ssl))`, dynamic target `concat("https://hockeybuggy.com", http.request.uri.path)`, status 301, preserve query string enabled. The source must be proxied for the rule to run. Attach the reviewed custom domains only at that point, review corresponding Wrangler route configuration, and verify TLS, HTTP-to-HTTPS and www canonicalization publicly. The current asset `_redirects` file cannot express host-level redirects.

Retain Netlify build settings, domain associations, `netlify.toml` and the original CNAME targets during the migration. Rollback: remove Workers custom-domain bindings for these website hosts, disable the new redirect rule, restore DNS-only `@ -> apex-loadbalancer.netlify.com` and `www -> hockeybuggy.netlify.com`. Do not change any other subdomain, email record, or nameserver. DNS caches and certificate issuance mean rollback is not instantaneous.

Verification: `git diff --check`, configuration guard, the new hosting test file, dry-run, and only the existing landing-page smoke tests as a baseline/regression check. No full repository suite, Rust source changes, or live-service mutation is needed.

Include in the final local commit: `Prepare Cloudflare static asset hosting`.

## Verification outcome

Completed locally on 2026-09-21:

- Initial configuration guard failed because the Wrangler configuration was absent, then passed after implementation.
- A representative legacy redirect failed with 404 instead of 301 before `_redirects` was added.
- `yarn test:cloudflare`: configuration guard and all 24 hosting tests passed.
- Existing landing-page smoke checks: five passed against the original static server. The existing page-load browser test also passed against Wrangler using an ignored temporary Playwright configuration under `.wrangler/`.
- `yarn install --immutable` passed. A targeted check with `YARN_NODE_LINKER=pnp` reproduced a Playwright module-resolution failure under Node 22. After pinning `node-modules` in the tracked `.yarnrc.yml`, a clean-HOME configuration check resolved the intended linker and all focused tests passed again. The original local linker was restored; no global configuration was changed.
- `yarn tsc --ignoreConfig --noEmit --skipLibCheck --strict --types node --target es2022 --module node16 --moduleResolution node16 playwright.cloudflare.config.ts cloudflare_tests/assets.test.ts` passed.
- `WRANGLER_SEND_METRICS=false yarn deploy:cloudflare --dry-run` passed without uploading or authenticating.
- Asset inspection: 87 files; largest file 10,953,821 bytes, below the Free static-asset limits.
- `git diff --check` passed. The main checkout remains clean. No full repository test suite was run.
- Read-only `wrangler whoami` reports no authentication. The next external step needs the owner's Cloudflare login, account/Worker-name confirmation and approval for a public workers.dev preview. Do not use an anonymous temporary account as a workaround.

## Remote preview verification — 2026-09-22

After the owner completed `wrangler login`, read-only account checks confirmed the intended account and that no `hockeybuggy` Worker existed. Published the assets-only configuration with `CI=true WRANGLER_SEND_METRICS=false yarn deploy:cloudflare`.

- Preview: https://hockeybuggy.hockeybuggy.workers.dev
- Worker version: `6c47dfb1-ef74-49fc-b1af-7f404fcdb200`
- Uploaded 86 static assets; `_redirects` is routing metadata, not a public asset.
- Reused all 24 hosting tests against the remote preview, plus the existing landing-page browser smoke test: **25 passed**. The temporary remote Playwright configuration is under the ignored `.wrangler/` directory.
- Checked live DNS and HTTPS after deployment: apex still resolves to Netlify's `75.2.60.5` and `99.83.231.61`; `www` remains `hockeybuggy.netlify.com`; the live homepage returns HTTP 200 from Netlify.
- No custom domains, DNS records, redirect rules, paid services, Git pushes or merges were changed. The production cutover remains a separate approval checkpoint.

## References

- https://developers.cloudflare.com/workers/static-assets/get-started/
- https://developers.cloudflare.com/workers/static-assets/redirects/
- https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
- https://developers.cloudflare.com/workers/wrangler/configuration/
- https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
