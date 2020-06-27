const puppeteer = require("puppeteer");

const { LANDING_PAGE } = require("./pages");

const iPhone = puppeteer.devices["iPhone 6"];

describe("/ (Landing Page)", () => {
  const loadPage = async () => {
    await page.emulate(iPhone);
    const response = await page.goto(LANDING_PAGE.url, {
      waitUntil: "networkidle2",
    });

    expect(response.ok());
    expect(page.url()).toEqual(LANDING_PAGE.url);
  };

  it("should load without error", async () => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage();

    expect(errors).toEqual([]);

    // Not related to this specific assertion but while we're here:
    await page.screenshot({
      path: `e2e_tests/screenshots/landing_page.png`,
    });
  });

  it("should have a title", async () => {
    await loadPage();
    expect(await page.title()).toEqual(LANDING_PAGE.expected.title);
  });
});
