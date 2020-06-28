const { BASE_URL, BLOG_PAGE } = require("./pages");
const { loadPage } = require("./utils");

// It seems a litte weird to manage this list of blog posts here in the tests.
// This is done in order to use `describe.each` and ensure that each of the
// blog posts load.
let expectedBlogPosts = [
  {
    postDate: "2020-05-10",
    postTitle: "Switching to Gatsby",
    postPathName: "/blog/2020/05/switching-to-gatsby",
  },
  {
    postDate: "2020-01-18",
    postTitle: "Experimenting with Protobufs generated types in Rust",
    postPathName:
      "/blog/2020/01/experimenting-with-protobufs-generated-types-in-rust",
  },
  {
    postDate: "2019-09-08",
    postTitle: "Migrated to Hugo Static Site generator",
    postPathName: "/blog/2019/09/migrated-to-hugo",
  },
  {
    postDate: "2016-08-26",
    postTitle: "Relative line numbers and you",
    postPathName: "/blog/2016/08/relative-line-numbers-and-you",
  },
  {
    postDate: "2016-01-18",
    postTitle: "Vim splitting shortcuts",
    postPathName: "/blog/2016/01/vim-splitting-shortcuts",
  },
  {
    postDate: "2015-03-18",
    postTitle: "Bashing long Python commands down to size",
    postPathName: "/blog/2015/03/long-python-commands-down-to-size",
  },
  {
    postDate: "2014-10-03",
    postTitle: "What's the deal with the name hockeybuggy?",
    postPathName: "/blog/2014/10/whats-the-deal-with-the-name-hockeybuggy",
  },
  {
    postDate: "2014-09-22",
    postTitle: "State of the Dotfiles",
    postPathName: "/blog/2014/09/state-of-the-dotfiles",
  },
  {
    postDate: "2014-06-23",
    postTitle: "Adding Semantics",
    postPathName: "/blog/2014/06/adding-semantics",
  },
  {
    postDate: "2013-09-11",
    postTitle: "Migrated to Jekyll",
    postPathName: "/blog/2013/09/migrated-to-jekyll",
  },
  {
    postDate: "2013-03-25",
    postTitle: "Moving beyond word-wise motions",
    postPathName: "/blog/2013/03/moving-beymond-word-wise-motions",
  },
  {
    postDate: "2013-01-31",
    postTitle: "A new a stylish look around the site. Thanks to sass",
    postPathName: "/blog/2013/01/adding-sass-files",
  },
  {
    postDate: "2012-12-02",
    postTitle: "Taking this Pelican site live",
    postPathName: "/blog/2012/12/taking-this-pelican-site-live",
  },
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
        const postTitle = article.querySelector("h3").textContent;
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
  const fullUrl = `${BASE_URL}${pathName}/`;

  it("should have a title", async () => {
    await loadPage(page, fullUrl);

    expect(await page.title()).toEqual(`${title} | hockeybuggy.com`);
  });

  it("should load without error", async () => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage(page, fullUrl);

    expect(errors).toEqual([]);
  });
});
