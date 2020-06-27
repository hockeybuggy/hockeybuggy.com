const puppeteer = require("puppeteer");

const { BLOG_PAGE } = require("./pages");

const iPhone = puppeteer.devices["iPhone 6"];

describe("/blog (Blog index Page)", () => {
  const loadPage = async () => {
    await page.emulate(iPhone);
    const response = await page.goto(BLOG_PAGE.url, {
      waitUntil: "networkidle2",
    });
    expect(response.ok());
    expect(page.url()).toEqual(BLOG_PAGE.url);
  };

  it("should load without error", async () => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push({ errorMessage: msg.text() });
      }
    });

    await loadPage();

    expect(errors).toEqual([]);

    // Not related to this specific assertion but while we're here:
    await page.screenshot({
      path: `e2e_tests/screenshots/blog_index_page.png`,
    });
  });

  it("should have a title", async () => {
    await loadPage();

    expect(await page.title()).toEqual(BLOG_PAGE.expected.title);
  });

  it("should have links to many blog posts", async () => {
    await loadPage();

    const blogPosts = await page.$$eval("article", (articles) =>
      articles.map((article) => {
        const postTitle = article.querySelector("h3").textContent;
        const postUrl = article.querySelector("a").href;
        const postDate = article.querySelector("time").dateTime;
        return { postTitle, postUrl, postDate };
      })
    );
    expect(blogPosts).toMatchSnapshot();
  });
});
