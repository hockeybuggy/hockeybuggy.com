import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const redirects = readFileSync('public/_redirects', 'utf8').trim().split('\n').map((line) => line.split(/\s+/));
if (!redirects.length || redirects.some((fields) => fields.length !== 3)) {
    throw new Error('Update the legacy redirect parser to cover every redirect');
}

for (const [from, to, status] of redirects) {
    test(`preserves legacy redirect ${from}`, async ({ request }) => {
        const response = await request.get(`${from}?source=migration`, { maxRedirects: 0 });
        expect(response.status()).toBe(Number(status));
        const target = new URL(response.headers().location, response.url());
        expect(target.origin).toBe(new URL(response.url()).origin);
        expect(target.pathname).toBe(to);
        expect(target.search).toBe('?source=migration');
        expect((await request.get(`${target.pathname}${target.search}`)).status()).toBe(200);
    });
}

for (const path of ['/', '/blog', '/projects', '/blog/post/2020/05/switching-to-gatsby']) {
    test(`serves canonical page ${path}`, async ({ request }) => {
        const response = await request.get(path, { maxRedirects: 0 });
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('text/html');
    });
}

test('preserves the HTTPS transport policy', async ({ request }) => {
    const response = await request.get('/');
    expect(response.headers()['strict-transport-security']).toBe('max-age=31536000');
});

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
