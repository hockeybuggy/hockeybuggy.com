/* eslint-disable @typescript-eslint/no-unused-vars */
import { test, expect } from '@playwright/test';
import { PROJECTS_PAGE } from "./pages";

const expectedProjects = [
  {
    postTitle: "Ray Tracer",
    postPathName: "/project/ray-tracer",
  },
  {
    postTitle: "This website",
    postPathName: "/project/this-site",
  },
  {
    postTitle: "Dotfiles",
    postPathName: "/project/dotfiles",
  },
  {
    postTitle: "Recurring tasks",
    postPathName: "/project/recurring-tasks",
  },
  {
    postTitle: "RGB Traveling Salesperson Art",
    postPathName: "/project/rgb-tsp-art",
  },
  {
    postTitle: "Rainbow single exposure photo",
    postPathName: "/project/rainbow-single-exposure",
  },
  {
    postTitle: "Clonenames",
    postPathName: "/project/clonenames",
  },
];

test.describe("/projects (Projects index Page)", () => {
  test.describe("screenshots", () => {
    test("iPhone light", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(PROJECTS_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/projects_index_page__iPhone_light.png`,
      });
    });

    test("iPhone dark", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(PROJECTS_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/projects_index_page__iPhone_dark.png`,
      });
    });

    test("iPad light", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(PROJECTS_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/projects_index_page__iPad_light.png`,
      });
    });

    test("iPad dark", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(PROJECTS_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/projects_index_page__iPad_dark.png`,
      });
    });
  });

  test("should load without error", async ({ page }) => {
    const errors: Array<{ errorMessage: string }> = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    const response = await page.goto(PROJECTS_PAGE.url);
    expect(response?.ok()).toBeTruthy();
    expect(errors).toEqual([]);
  });

  test("should have links to many projects", async ({ page }) => {
    await page.goto(PROJECTS_PAGE.url);

    const projects = await page.$$eval("article", (articles) =>
      articles.map((article) => {
        const postTitle = article.querySelector("h2")?.textContent;
        const postUrl = new URL(
          (article.querySelector(".read-more a") as HTMLAnchorElement)?.href || "http://localhost:4000",
        );
        const postPathName = postUrl.pathname;
        return { postTitle, postPathName };
      }),
    );
    expect(projects).toEqual(expectedProjects);
  });
});

for (const project of expectedProjects) {
  test(`Project detail: ${project.postPathName}`, async ({ page }) => {
    await page.goto(project.postPathName);
    await expect(page).toHaveTitle(`Project: ${project.postTitle}`);
  });
}
