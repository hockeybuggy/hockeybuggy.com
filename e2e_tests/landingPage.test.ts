import { LANDING_PAGE } from "./pages";
import { loadPage } from "./utils";

describe("/ (Landing Page)", () => {
  it("should load without error", async () => {
    const errors: Array<{ errorMessage: string }> = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage(page, LANDING_PAGE.url);

    expect(errors).toEqual([]);
  });

  it("should have a title", async () => {
    await loadPage(page, LANDING_PAGE.url);
    expect(await page.title()).toEqual(LANDING_PAGE.expected.title);
  });

  describe("screenshots", () => {
    test("iPhone light", async () => {
      await loadPage(page, LANDING_PAGE.url, "iPhone 6");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" },
      ]);
      const screenshot = await page.screenshot({
        path: `e2e_tests/screenshots/landing_page__iPhone_light.png`,
      });
      expect(screenshot).toBeTruthy();
    });

    test("iPhone dark", async () => {
      await loadPage(page, LANDING_PAGE.url, "iPhone 6");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "dark" },
      ]);
      const screenshot = await page.screenshot({
        path: `e2e_tests/screenshots/landing_page__iPhone_dark.png`,
      });
      expect(screenshot).toBeTruthy();
    });

    test("iPad light", async () => {
      await loadPage(page, LANDING_PAGE.url, "iPad Pro");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" },
      ]);
      const screenshot = await page.screenshot({
        path: `e2e_tests/screenshots/landing_page__iPad_light.png`,
      });
      expect(screenshot).toBeTruthy();
    });

    test("iPad dark", async () => {
      await loadPage(page, LANDING_PAGE.url, "iPad Pro");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "dark" },
      ]);
      const screenshot = await page.screenshot({
        path: `e2e_tests/screenshots/landing_page__iPad_dark.png`,
      });
      expect(screenshot).toBeTruthy();
    });
  });
});
