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
