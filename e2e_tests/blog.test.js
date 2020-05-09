const puppeteer = require("puppeteer");

const { BLOG_PAGE } = require("./pages");

const iPhone = puppeteer.devices["iPhone 6"];

describe("/blog (Blog index Page)", () => {
  beforeAll(async () => {
    await page.emulate(iPhone);
  });

  it("should load without error", async () => {
    const response = await page.goto(BLOG_PAGE.url, {
      waitUntil: "networkidle2",
    });
    expect(response.ok());
    expect(page.url()).toEqual(BLOG_PAGE.url);
    await page.screenshot({
      path: `e2e_tests/screenshots/blog_index_page.png`,
    });
  });
});
