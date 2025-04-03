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

  it("should have GitHub social link with proper attributes", async () => {
    await loadPage(page, LANDING_PAGE.url);

    const githubLink = await page.$('a[aria-label="GitHub"]');
    expect(githubLink).not.toBeNull();

    const href = await githubLink?.evaluate((el) => el.getAttribute("href"));
    expect(href).toBe("https://github.com/hockeybuggy");
  });

  it("should have Bluesky social link with proper attributes", async () => {
    await loadPage(page, LANDING_PAGE.url);

    const blueskyLink = await page.$('a[aria-label="Bluesky"]');
    expect(blueskyLink).not.toBeNull();

    const href = await blueskyLink?.evaluate((el) => el.getAttribute("href"));
    expect(href).toBe("https://bsky.app/profile/hockeybuggy.bsky.social");
  });

  it("should have Email social link with proper attributes", async () => {
    await loadPage(page, LANDING_PAGE.url);

    const emailLink = await page.$('a[aria-label="Email"]');
    expect(emailLink).not.toBeNull();

    const href = await emailLink?.evaluate((el) => el.getAttribute("href"));
    expect(href).toBe("mailto:hockeybuggy@gmail.com");
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
