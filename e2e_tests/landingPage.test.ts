import { test, expect } from '@playwright/test';
import { LANDING_PAGE } from "./pages";

test.describe("/ (Landing Page)", () => {
  test("should load without error", async ({ page }) => {
    const errors: Array<{ errorMessage: string }> = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    const response = await page.goto(LANDING_PAGE.url);
    expect(response?.ok()).toBeTruthy();
    expect(errors).toEqual([]);
  });

  test("should have a title", async ({ page }) => {
    await page.goto(LANDING_PAGE.url);
    await expect(page).toHaveTitle(LANDING_PAGE.expected.title);
  });

  test("should have GitHub social link with proper attributes", async ({ page }) => {
    await page.goto(LANDING_PAGE.url);
    await expect(page.locator('a[aria-label="GitHub"]')).toHaveAttribute('href', 'https://github.com/hockeybuggy');
  });

  test("should have Bluesky social link with proper attributes", async ({ page }) => {
    await page.goto(LANDING_PAGE.url);
    await expect(page.locator('a[aria-label="Bluesky"]')).toHaveAttribute('href', 'https://bsky.app/profile/hockeybuggy.bsky.social');
  });

  test("should have Email social link with proper attributes", async ({ page }) => {
    await page.goto(LANDING_PAGE.url);
    await expect(page.locator('a[aria-label="Email"]')).toHaveAttribute('href', 'mailto:hockeybuggy@gmail.com');
  });

  test.describe("screenshots", () => {
    test("iPhone light", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(LANDING_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/landing_page__iPhone_light.png`,
      });
    });

    test("iPhone dark", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(LANDING_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/landing_page__iPhone_dark.png`,
      });
    });

    test("iPad light", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(LANDING_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/landing_page__iPad_light.png`,
      });
    });

    test("iPad dark", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(LANDING_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/landing_page__iPad_dark.png`,
      });
    });
  });
});
