/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
import { BASE_URL, PROJECTS_PAGE } from "./pages";
import { loadPage } from "./utils";

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

describe("/projects (Projects index Page)", () => {
  describe("screenshots", () => {
    test("iPhone light", async () => {
      await loadPage(page, PROJECTS_PAGE.url, "iPhone 6");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" },
      ]);
      const screenshot = await page.screenshot({
        path: `e2e_tests/screenshots/projects_index_page__iPhone_light.png`,
      });
      expect(screenshot).toBeTruthy();
    });

    test("iPhone dark", async () => {
      await loadPage(page, PROJECTS_PAGE.url, "iPhone 6");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "dark" },
      ]);
      const screenshot = await page.screenshot({
        path: `e2e_tests/screenshots/projects_index_page__iPhone_dark.png`,
      });
      expect(screenshot).toBeTruthy();
    });

    test("iPad light", async () => {
      await loadPage(page, PROJECTS_PAGE.url, "iPad Pro");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" },
      ]);
      const screenshot = await page.screenshot({
        path: `e2e_tests/screenshots/projects_index_page__iPad_light.png`,
      });
      expect(screenshot).toBeTruthy();
    });

    test("iPad dark", async () => {
      await loadPage(page, PROJECTS_PAGE.url, "iPad Pro");
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "dark" },
      ]);
      const screenshot = await page.screenshot({
        path: `e2e_tests/screenshots/projects_index_page__iPad_dark.png`,
      });
      expect(screenshot).toBeTruthy();
    });
  });

  it("should load without error", async () => {
    const errors: Array<{ errorMessage: string }> = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage(page, PROJECTS_PAGE.url);

    expect(errors).toEqual([]);
  });

  it("should have links to many projects", async () => {
    await loadPage(page, PROJECTS_PAGE.url);

    const projects = await page.$$eval("article", (articles) =>
      articles.map((article) => {
        const postTitle = article.querySelector("h2")?.textContent;
        const postUrl = new URL(
          (article.querySelector(".read-more a") as unknown as any)?.href || "",
        );
        const postPathName = postUrl.pathname;
        return { postTitle, postPathName };
      }),
    );
    expect(projects).toEqual(expectedProjects);
  });
});

const projects = expectedProjects.map((project) => [
  project.postPathName,
  project.postTitle,
]);
describe.each(projects)("%s", (pathName, title) => {
  const fullUrl = `${BASE_URL}${pathName}`;

  it("should have a title", async () => {
    await loadPage(page, fullUrl);

    expect(await page.title()).toEqual(`Project: ${title}`);
  });
});
