/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
const { BASE_URL, PROJECTS_PAGE } = require("./pages");
const { loadPage } = require("./utils");

const expectedProjects = [
  {
    postTitle: "Clonenames",
    postPathName: "/project/clonenames",
  },
  {
    postTitle: "Dotfiles",
    postPathName: "/project/dotfiles",
  },
  {
    postTitle: "Rainbow single exposure photo",
    postPathName: "/project/rainbow-single-exposure",
  },
  {
    postTitle: "Ray Tracer",
    postPathName: "/project/ray-tracer",
  },
  {
    postTitle: "RGB Traveling Salesperson Art",
    postPathName: "/project/rgb-tsp-art",
  },
  {
    postTitle: "Recurring tasks",
    postPathName: "/project/recurring-tasks",
  },
  {
    postTitle: "This website",
    postPathName: "/project/this-site",
  },
];

describe("/projects (Projects index Page)", () => {
  it("should load without error", async () => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage(page, PROJECTS_PAGE.url);

    expect(errors).toEqual([]);

    // Not related to this specific assertion but while we're here:
    await page.screenshot({
      path: `e2e_tests/screenshots/projects_index_page.png`,
    });
  });

  it("should have links to many projects", async () => {
    await loadPage(page, PROJECTS_PAGE.url);

    const projects = await page.$$eval("article", (articles) =>
      articles.map((article) => {
        const postTitle = article.querySelector("h2").textContent;
        const postUrl = new URL(article.querySelector("a").href);
        const postPathName = postUrl.pathname;
        return { postTitle, postPathName };
      })
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
