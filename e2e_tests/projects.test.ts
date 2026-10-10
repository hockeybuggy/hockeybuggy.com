/* eslint-disable @typescript-eslint/no-unused-vars */
import { test, expect } from '@playwright/test';
import { PROJECTS_PAGE } from "./pages";

const expectedProjects = [
  {
    postTitle: "Ray Tracer",
    postPathName: "/project/ray-tracer",
    editDate: "2026-07-13",
  },
  {
    postTitle: "This website",
    postPathName: "/project/this-site",
    editDate: "2026-09-23",
  },
  {
    postTitle: "Dotfiles",
    postPathName: "/project/dotfiles",
    editDate: "2026-07-06",
  },
  {
    postTitle: "Recurring tasks",
    postPathName: "/project/recurring-tasks",
    editDate: "2026-06-25",
  },
  {
    postTitle: "RGB Traveling Salesperson Art",
    postPathName: "/project/rgb-tsp-art",
    editDate: "2026-07-06",
  },
  {
    postTitle: "Rainbow single exposure photo",
    postPathName: "/project/rainbow-single-exposure",
    editDate: "2026-06-25",
  },
  {
    postTitle: "Clonenames",
    postPathName: "/project/clonenames",
    editDate: "2026-06-25",
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

  test("should show each project's last modified date", async ({ page }) => {
    await page.goto(PROJECTS_PAGE.url);

    for (const project of expectedProjects) {
      const article = page.locator("article").filter({
        has: page.getByRole("heading", { name: project.postTitle, exact: true }),
      });
      await expect(article.locator("time")).toHaveAttribute("datetime", project.editDate);
      await expect(article.locator("time")).toHaveText(project.editDate);
      await expect(article).toContainText("Last modified:");
    }
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
    expect(projects).toEqual(expectedProjects.map(({ editDate, ...project }) => project));
  });
});

for (const colorScheme of ["light", "dark"] as const) {
  test(`Modified dates use smaller text (${colorScheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.setViewportSize({ width: colorScheme === "light" ? 1440 : 375, height: 900 });

    for (const route of [PROJECTS_PAGE.url, expectedProjects[0].postPathName]) {
      await page.goto(route);
      const sizes = await page.locator(".project-modified-date").first().evaluate((element) => ({
        date: parseFloat(getComputedStyle(element).fontSize),
        body: parseFloat(getComputedStyle(document.body).fontSize),
      }));
      expect(sizes.date).toBeLessThanOrEqual(sizes.body * 0.75);
    }
  });
}

for (const project of expectedProjects) {
  test(`Project detail: ${project.postPathName}`, async ({ page }) => {
    await page.goto(project.postPathName);
    await expect(page).toHaveTitle(`Project: ${project.postTitle}`);
    await expect(page.locator("article header time")).toHaveAttribute("datetime", project.editDate);
    await expect(page.locator("article header time")).toHaveText(project.editDate);
    await expect(page.locator("article header")).toContainText("Last modified:");
  });
}
