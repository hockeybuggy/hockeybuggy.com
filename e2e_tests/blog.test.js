/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
const { CATEGORIES_PAGE, TAGS_PAGE, BASE_URL, BLOG_PAGE } = require("./pages");
const { loadPage } = require("./utils");

// It seems a litte weird to manage this list of blog posts here in the tests.
// This is done in order to use `describe.each` and ensure that each of the
// blog posts load.
const expectedBlogPosts = [
  {
    postDate: "2021-12-26",
    postTitle: "Switching to Next.js",
    postPathName: "/blog/post/2021/12/switching-to-next-js",
  },
  {
    postDate: "2020-05-10",
    postTitle: "Switching to Gatsby",
    postPathName: "/blog/post/2020/05/switching-to-gatsby",
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
  },
  {
    postDate: "2013-09-11",
    postTitle: "Migrated to Jekyll",
    postPathName: "/blog/post/2013/09/migrated-to-jekyll",
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
  },
  {
    postDate: "2012-12-02",
    postTitle: "Taking this site live",
    postPathName: "/blog/post/2012/12/taking-this-pelican-site-live",
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

describe("/blog (Blog index Page)", () => {
  it("should load without error", async () => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage(page, BLOG_PAGE.url);

    expect(errors).toEqual([]);

    // Not related to this specific assertion but while we're here:
    await page.screenshot({
      path: `e2e_tests/screenshots/blog_index_page.png`,
    });
  });

  it("should have links to many blog posts", async () => {
    await loadPage(page, BLOG_PAGE.url);

    const blogPosts = await page.$$eval("article", (articles) =>
      articles.map((article) => {
        const postTitle = article.querySelector("h2").textContent;
        const postUrl = new URL(article.querySelector("a").href);
        const postPathName = postUrl.pathname;
        const postDate = article.querySelector("time").dateTime;
        return { postTitle, postPathName, postDate };
      })
    );
    expect(blogPosts).toEqual(expectedBlogPosts);
  });
});

const blogPosts = expectedBlogPosts.map((blogPost) => [
  blogPost.postPathName,
  blogPost.postTitle,
]);
describe.each(blogPosts)("%s", (pathName, title) => {
  const fullUrl = `${BASE_URL}${pathName}`;

  it("should have a title", async () => {
    await loadPage(page, fullUrl);

    expect(await page.title()).toEqual(`${title}`);
  });
});

describe("/blog/tags (Blog tags index Page)", () => {
  it("should load without error", async () => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage(page, TAGS_PAGE.url);

    expect(errors).toEqual([]);

    // Not related to this specific assertion but while we're here:
    await page.screenshot({
      path: `e2e_tests/screenshots/tags_index_page.png`,
    });
  });

  it("should have a title", async () => {
    await loadPage(page, TAGS_PAGE.url);
    expect(await page.title()).toEqual(TAGS_PAGE.expected.title);
  });

  it("should have links to many tags", async () => {
    await loadPage(page, TAGS_PAGE.url);

    const tagLinks = await page.$$eval(".content li", (items) => {
      return items.map((item) => {
        const postUrl = new URL(item.querySelector("a").href);
        return postUrl.pathname;
      });
    });
    expect(tagLinks).toEqual(expectedTagLinks);
  });
});

describe.each(expectedTagLinks)("%s", (pathName) => {
  const fullUrl = `${BASE_URL}${pathName}`;
  const [_1, _2, title] = pathName.split("/").filter((x) => x !== "");

  beforeAll(async () => {
    await loadPage(page, fullUrl);
  });

  it(`should have a title including ${title}`, async () => {
    expect(await page.title()).toEqual(`Tag: ${title}`);
  });

  it(`should have links to existing blog posts`, async () => {
    const blogPostLinks = await page.$$eval(".content li", (items) => {
      return items.map((item) => {
        const postUrl = new URL(item.querySelector("a").href);
        return postUrl.pathname;
      });
    });

    blogPostLinks.forEach((link) => {
      expect(allBlogPostPaths).toContain(link);
    });
  });
});

describe("/blog/categories (Blog categories index Page)", () => {
  it("should load without error", async () => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage(page, CATEGORIES_PAGE.url);

    expect(errors).toEqual([]);

    // Not related to this specific assertion but while we're here:
    await page.screenshot({
      path: `e2e_tests/screenshots/categories_index_page.png`,
    });
  });

  it("should have a title", async () => {
    await loadPage(page, CATEGORIES_PAGE.url);
    expect(await page.title()).toEqual(CATEGORIES_PAGE.expected.title);
  });

  it("should have links to many categories", async () => {
    await loadPage(page, CATEGORIES_PAGE.url);

    const categoryLinks = await page.$$eval(".content li", (items) => {
      return items.map((item) => {
        const postUrl = new URL(item.querySelector("a").href);
        return postUrl.pathname;
      });
    });
    expect(categoryLinks).toEqual(expectedCategoryLinks);
  });
});

describe.each(expectedCategoryLinks)("%s", (pathName) => {
  const fullUrl = `${BASE_URL}${pathName}`;
  const [_1, _2, title] = pathName.split("/").filter((x) => x !== "");

  beforeAll(async () => {
    await loadPage(page, fullUrl);
  });

  it(`should have a title including ${title}`, async () => {
    expect(await page.title()).toEqual(`Category: ${title}`);
  });

  it(`should have links to existing blog posts`, async () => {
    const blogPostLinks = await page.$$eval(".content li", (items) => {
      return items.map((item) => {
        const postUrl = new URL(item.querySelector("a").href);
        return postUrl.pathname;
      });
    });

    blogPostLinks.forEach((link) => {
      expect(allBlogPostPaths).toContain(link);
    });
  });
});
