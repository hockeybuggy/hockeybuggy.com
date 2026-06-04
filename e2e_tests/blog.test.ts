/* eslint-disable @typescript-eslint/no-unused-vars */
import { test, expect } from '@playwright/test';
import { CATEGORIES_PAGE, TAGS_PAGE, BLOG_PAGE } from "./pages";

const expectedBlogPosts = [
  {
    postDate: "2026-04-19",
    postTitle: "Switching to a custom static site generator",
    postPathName: "/blog/post/2026/04/custom-static-site-generator",
  },
  {
    postDate: "2024-11-15",
    postTitle: "Making a fancy loading state",
    postPathName: "/blog/post/2024/11/fancy-loading-state",
  },
  {
    postDate: "2021-12-26",
    postTitle: "Switching to Next.js",
    postPathName: "/blog/post/2021/12/switching-to-next-js",
  },
  {
    postDate: "2020-05-10",
    postTitle: "Switching to Gatsby",
    postPathName: "/blog/post/2020/05/switching-to-gatsby",
    isDelisted: true,
  },
  {
    postDate: "2020-01-18",
    postTitle: "Experimenting with Protobufs generated types in Rust",
    postPathName:
      "/blog/post/2020/01/experimenting-with-protobufs-generated-types-in-rust",
  },
  {
    postDate: "2019-09-08",
    postTitle: "Migrated to Hugo Static Site generator",
    postPathName: "/blog/post/2019/09/migrated-to-hugo",
    isDelisted: true,
  },
  {
    postDate: "2016-08-26",
    postTitle: "Relative line numbers and you",
    postPathName: "/blog/post/2016/08/relative-line-numbers-and-you",
  },
  {
    postDate: "2016-01-18",
    postTitle: "Vim splitting shortcuts",
    postPathName: "/blog/post/2016/01/vim-splitting-shortcuts",
  },
  {
    postDate: "2015-03-18",
    postTitle: "Bashing long Python commands down to size",
    postPathName: "/blog/post/2015/03/long-python-commands-down-to-size",
  },
  {
    postDate: "2014-10-03",
    postTitle: "What's the deal with the name hockeybuggy?",
    postPathName: "/blog/post/2014/10/whats-the-deal-with-the-name-hockeybuggy",
  },
  {
    postDate: "2014-09-22",
    postTitle: "State of the Dotfiles",
    postPathName: "/blog/post/2014/09/state-of-the-dotfiles",
  },
  {
    postDate: "2014-06-23",
    postTitle: "Adding Semantics",
    postPathName: "/blog/post/2014/06/adding-semantics",
    isDelisted: true,
  },
  {
    postDate: "2013-09-11",
    postTitle: "Migrated to Jekyll",
    postPathName: "/blog/post/2013/09/migrated-to-jekyll",
    isDelisted: true,
  },
  {
    postDate: "2013-03-25",
    postTitle: "Moving beyond word-wise motions",
    postPathName: "/blog/post/2013/03/moving-beymond-word-wise-motions",
  },
  {
    postDate: "2013-01-31",
    postTitle: "A new a stylish look around the site. Thanks to sass",
    postPathName: "/blog/post/2013/01/adding-sass-files",
    isDelisted: true,
  },
  {
    postDate: "2012-12-02",
    postTitle: "Taking this site live",
    postPathName: "/blog/post/2012/12/taking-this-pelican-site-live",
    isDelisted: true,
  },
];
const allBlogPostPaths = expectedBlogPosts.map((p) => p.postPathName);
const expectedTagLinks = [
  "/blog/tags/development",
  "/blog/tags/html",
  "/blog/tags/jekyll",
  "/blog/tags/misc",
  "/blog/tags/pelican",
  "/blog/tags/protobufs",
  "/blog/tags/python",
  "/blog/tags/rust",
  "/blog/tags/sass",
  "/blog/tags/vim",
  "/blog/tags/zsh",
];
const expectedCategoryLinks = [
  "/blog/categories/meta",
  "/blog/categories/misc",
  "/blog/categories/vim",
  "/blog/categories/zsh",
];

test.describe("/blog (Blog index Page)", () => {
  test("should load without error", async ({ page }) => {
    const errors: Array<{ errorMessage: string }> = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    const response = await page.goto(BLOG_PAGE.url);
    expect(response?.ok()).toBeTruthy();
    expect(errors).toEqual([]);
  });

  test("should have links to many blog posts", async ({ page }) => {
    await page.goto(BLOG_PAGE.url);

    const blogPosts = await page.$$eval("article", (articles) =>
      articles.map((article) => {
        const postTitle = article.querySelector("h2")?.textContent;
        const postUrl = new URL((article.querySelector("a") as HTMLAnchorElement)?.href || "http://localhost:4000");
        const postPathName = postUrl.pathname;
        const postDate = article.querySelector("time")?.dateTime;
        return { postTitle, postPathName, postDate };
      }),
    );

    const indexListedBlogPosts = expectedBlogPosts.filter(
      (blog) => !blog.isDelisted,
    );

    expect(blogPosts).toEqual(indexListedBlogPosts);
  });

  test.describe("screenshots", () => {
    test("iPhone light", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(BLOG_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_index_page__iPhone_light.png`,
      });
    });

    test("iPhone dark", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(BLOG_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_index_page__iPhone_dark.png`,
      });
    });

    test("iPad light", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(BLOG_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_index_page__iPad_light.png`,
      });
    });

    test("iPad dark", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(BLOG_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_index_page__iPad_dark.png`,
      });
    });
  });
});

for (const blogPost of expectedBlogPosts) {
  test(`Blog post: ${blogPost.postPathName}`, async ({ page }) => {
    await page.goto(blogPost.postPathName);
    await expect(page).toHaveTitle(`${blogPost.postTitle}`);
  });
}

test.describe("/blog/tags (Blog tags index Page)", () => {
  test("should load without error", async ({ page }) => {
    const errors: Array<{ errorMessage: string }> = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    const response = await page.goto(TAGS_PAGE.url);
    expect(response?.ok()).toBeTruthy();
    expect(errors).toEqual([]);
  });

  test("should have a title", async ({ page }) => {
    await page.goto(TAGS_PAGE.url);
    await expect(page).toHaveTitle(TAGS_PAGE.expected.title);
  });

  test("should have links to many tags", async ({ page }) => {
    await page.goto(TAGS_PAGE.url);

    const tagLinks = await page.$$eval(".content li", (items) => {
      return items.map((item) => {
        const postUrl = new URL((item.querySelector("a") as HTMLAnchorElement)?.href || "http://localhost:4000");
        return postUrl.pathname;
      });
    });
    expect(tagLinks).toEqual(expectedTagLinks);
  });

  test.describe("screenshots", () => {
    test("iPhone light", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(TAGS_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_tags_index_page__iPhone_light.png`,
      });
    });

    test("iPhone dark", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(TAGS_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_tags_index_page__iPhone_dark.png`,
      });
    });

    test("iPad light", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(TAGS_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_tags_index_page__iPad_light.png`,
      });
    });

    test("iPad dark", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(TAGS_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_tags_index_page__iPad_dark.png`,
      });
    });
  });
});

for (const pathName of expectedTagLinks) {
  const parts = pathName.split("/").filter((x) => x !== "");
  const title = parts[parts.length - 1];
  
  test.describe(`Tag detail: ${pathName}`, () => {
    test(`should have a title including ${title}`, async ({ page }) => {
      await page.goto(pathName);
      await expect(page).toHaveTitle(`Tag: ${title}`);
    });

    test(`should have links to existing blog posts`, async ({ page }) => {
      await page.goto(pathName);
      const blogPostLinks = await page.$$eval(".content li", (items) => {
        return items.map((item) => {
          const postUrl = new URL((item.querySelector("a") as HTMLAnchorElement)?.href || "http://localhost:4000");
          return postUrl.pathname;
        });
      });

      blogPostLinks.forEach((link) => {
        expect(allBlogPostPaths).toContain(link);
      });
    });
  });
}

test.describe("/blog/categories (Blog categories index Page)", () => {
  test("should load without error", async ({ page }) => {
    const errors: Array<{ errorMessage: string }> = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    const response = await page.goto(CATEGORIES_PAGE.url);
    expect(response?.ok()).toBeTruthy();
    expect(errors).toEqual([]);
  });

  test("should have a title", async ({ page }) => {
    await page.goto(CATEGORIES_PAGE.url);
    await expect(page).toHaveTitle(CATEGORIES_PAGE.expected.title);
  });

  test("should have links to many categories", async ({ page }) => {
    await page.goto(CATEGORIES_PAGE.url);

    const categoryLinks = await page.$$eval(".content li", (items) => {
      return items.map((item) => {
        const postUrl = new URL((item.querySelector("a") as HTMLAnchorElement)?.href || "http://localhost:4000");
        return postUrl.pathname;
      });
    });
    expect(categoryLinks).toEqual(expectedCategoryLinks);
  });

  test.describe("screenshots", () => {
    test("iPhone light", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(CATEGORIES_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_categories_index_page__iPhone_light.png`,
      });
    });

    test("iPhone dark", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(CATEGORIES_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_categories_index_page__iPhone_dark.png`,
      });
    });

    test("iPad light", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(CATEGORIES_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_categories_index_page__iPad_light.png`,
      });
    });

    test("iPad dark", async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 1366 });
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(CATEGORIES_PAGE.url);
      await page.screenshot({
        path: `e2e_tests/screenshots/blog_categories_index_page__iPad_dark.png`,
      });
    });
  });
});

for (const pathName of expectedCategoryLinks) {
  const parts = pathName.split("/").filter((x) => x !== "");
  const title = parts[parts.length - 1];

  test.describe(`Category detail: ${pathName}`, () => {
    test(`should have a title including ${title}`, async ({ page }) => {
      await page.goto(pathName);
      await expect(page).toHaveTitle(`Category: ${title}`);
    });

    test(`should have links to existing blog posts`, async ({ page }) => {
      await page.goto(pathName);
      const blogPostLinks = await page.$$eval(".content li", (items) => {
        return items.map((item) => {
          const postUrl = new URL((item.querySelector("a") as HTMLAnchorElement)?.href || "http://localhost:4000");
          return postUrl.pathname;
        });
      });

      blogPostLinks.forEach((link) => {
        expect(allBlogPostPaths).toContain(link);
      });
    });
  });
}
