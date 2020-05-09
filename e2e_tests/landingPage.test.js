const puppeteer = require("puppeteer");

const { LANDING_PAGE } = require("./pages");

const iPhone = puppeteer.devices["iPhone 6"];

describe("/ (Landing Page)", () => {
  beforeAll(async () => {
    await page.emulate(iPhone);
  });

  it("should load without error", async () => {
    const response = await page.goto(LANDING_PAGE.url, {
      waitUntil: "networkidle2",
    });
    expect(response.ok());
    expect(page.url()).toEqual(LANDING_PAGE.url);
    await page.screenshot({
      path: `e2e_tests/screenshots/landing_page.png`,
    });
  });
});
