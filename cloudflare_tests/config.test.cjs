const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');

test('limits asset hosting to the approved domains', () => {
    const config = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'));
    assert.equal(config.workers_dev, true);
    assert.equal(config.assets.directory, './dist');
    assert.deepEqual(config.routes, [
        { pattern: 'hockeybuggy.com', custom_domain: true },
        { pattern: 'www.hockeybuggy.com', custom_domain: true },
    ]);
    for (const key of ['main', 'route', 'env']) {
        assert.equal(config[key], undefined, `${key} requires a separate deployment review`);
    }
});
