const { LANDING_PAGE } = require("./pages");
const { loadPage } = require("./utils");

describe("/ (Landing Page)", () => {
  it("should load without error", async () => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage(page, LANDING_PAGE.url);

    expect(errors).toEqual([]);

    // Not related to this specific assertion but while we're here:
    await page.screenshot({
      path: `e2e_tests/screenshots/landing_page.png`,
    });
  });

  it("should have a title", async () => {
    await loadPage(page, LANDING_PAGE.url);
    expect(await page.title()).toEqual(LANDING_PAGE.expected.title);
  });
});
