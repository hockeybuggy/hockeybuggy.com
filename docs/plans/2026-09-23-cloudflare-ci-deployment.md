# Cloudflare CI Deployment Plan

> **For implementors:** Use the executing-plans skill if human checkpoints are requested.

**Goal:** Restore push-to-deploy behavior for the live Cloudflare website, only after all checks pass.

**Architecture:** Add a production deployment job to the existing push workflow. Reuse its build action and existing GitHub secrets; expose credentials only to the deployment step. Serialize deployment jobs and skip stale revisions. Keep Netlify available for rollback and leave DNS/redirect rules untouched.

**Tech stack:** GitHub Actions, existing Rust/Yarn build actions, pinned Wrangler, actionlint, focused Python/PyYAML workflow checks.

**Workspace:** `/Users/douglas/devel/hockeybuggy.com/.worktrees/cloudflare-deployment-ci`, branch `feature/cloudflare-deployment-ci`.

## Task 1: Add the gated deployment job

Files:
- Modify `.github/workflows/tests_and_linting.yml`
- Temporary verification script: `/tmp/hockeybuggy-ci-deployment-check.py`

First create and run this focused check before adding the job. It must fail because there is no `deploy` job:

```python
import os
import subprocess
import tempfile
from pathlib import Path
import yaml

workflow = yaml.safe_load(Path('.github/workflows/tests_and_linting.yml').read_text())
assert 'deploy' in workflow['jobs'], 'Missing Cloudflare deployment job'
job = workflow['jobs']['deploy']
assert job['if'] == "github.event_name == 'push' && github.ref == 'refs/heads/main'"
assert set(job['needs']) == {'rust-checks', 'build', 'run-end-to-end-tests', 'link-check'}
assert job['permissions'] == {'contents': 'read'}
assert job['concurrency'] == {'group': 'cloudflare-production', 'cancel-in-progress': False}
assert 'env' not in job
steps = job['steps']
revision = next(step for step in steps if step.get('id') == 'revision')
deploy = next(step for step in steps if step.get('name') == 'Deploy to Cloudflare')
assert deploy['if'] == "steps.revision.outputs.current == 'true'"
assert deploy['env']['CLOUDFLARE_API_TOKEN'] == '${{ secrets.CLOUDFLARE_API_TOKEN }}'
assert deploy['env']['CLOUDFLARE_ACCOUNT_ID'] == '${{ secrets.CLOUDFLARE_ACCOUNT_ID }}'
assert '726f1369a47436d0572ed49705aaf86a' in deploy['run']
assert 'yarn wrangler deployments list --name hockeybuggy' in deploy['run']
assert deploy['run'].strip().endswith('yarn wrangler deploy')
assert any(step.get('uses') == './.github/actions/build-site' for step in steps[:steps.index(deploy)])
for current in (True, False):
    with tempfile.TemporaryDirectory() as folder:
        output = Path(folder) / 'output'
        summary = Path(folder) / 'summary'
        output.touch()
        summary.touch()
        fake_git = 'git() { printf "%s\\trefs/heads/main\\n" "$REMOTE_SHA"; }; export -f git\n'
        subprocess.run(['bash', '-euo', 'pipefail', '-c', fake_git + revision['run']], check=True, env={**os.environ, 'REMOTE_SHA': 'tested' if current else 'newer', 'GITHUB_SHA': 'tested', 'GITHUB_OUTPUT': str(output), 'GITHUB_STEP_SUMMARY': str(summary)})
        assert ('current=true' in output.read_text()) == current
        if not current:
            assert 'Skipping' in summary.read_text()
print('Deployment gates and stale-revision behavior passed.')
```

Run:

```sh
uv run --with pyyaml python3 /tmp/hockeybuggy-ci-deployment-check.py
```

Add this job to `.github/workflows/tests_and_linting.yml`:

```yaml
  deploy:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: [rust-checks, build, run-end-to-end-tests, link-check]
    runs-on: ubuntu-24.04
    permissions:
      contents: read
    concurrency:
      group: cloudflare-production
      cancel-in-progress: false
    steps:
    - uses: actions/checkout@v5
    - uses: ./.github/actions/shared-setup
    - uses: ./.github/actions/build-site
    - name: Check deployment revision
      id: revision
      shell: bash
      run: |
        latest_sha=$(git ls-remote origin refs/heads/main | cut -f1)
        if [ "$latest_sha" = "$GITHUB_SHA" ]; then
          echo "current=true" >> "$GITHUB_OUTPUT"
        else
          echo "Skipping deployment: main has a newer commit." >> "$GITHUB_STEP_SUMMARY"
        fi
    - name: Deploy to Cloudflare
      if: steps.revision.outputs.current == 'true'
      env:
        CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        WRANGLER_SEND_METRICS: "false"
      run: |
        test -n "$CLOUDFLARE_API_TOKEN"
        if [ "$CLOUDFLARE_ACCOUNT_ID" != "726f1369a47436d0572ed49705aaf86a" ]; then
          echo "::error::CLOUDFLARE_ACCOUNT_ID does not match the production account."
          exit 1
        fi
        yarn wrangler deployments list --name hockeybuggy
        yarn wrangler deploy
```

Rerun the focused check, then `actionlint .github/workflows/tests_and_linting.yml` and `git diff --check`. The direct Wrangler command is intentional: the earlier build action supplies the tested `dist/`, so the build does not need access to deployment credentials.

## Task 2: Document and verify the first deployment

File: `README.md`, deployment section.

Replace the manual-only description with the main-only, checks-gated deployment behavior. Document the two existing repository secrets, the stale-revision skip, and that the migration DNS token is not the CI deployment credential. Keep manual `yarn deploy:cloudflare` available as an explicit production deployment command.

Commit subject: `Deploy Cloudflare after successful CI`

Fetch upstream, merge without dropping unrelated changes if needed, fast-forward `main`, and push without force. This push is the first real integration test of the existing secret permissions. Observe the GitHub Actions run and verify it deploys to the existing `hockeybuggy` Worker in the expected account. Check live HTTPS afterward. If credentials are missing or insufficient, stop at that blocker rather than broadening permissions, exposing secrets, or substituting the DNS migration token.

No full test suite is run locally. The existing GitHub workflow runs its normal checks before deployment. Do not delete Netlify configuration, change DNS, or add paid services.
