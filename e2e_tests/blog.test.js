const puppeteer = require("puppeteer");

const { BLOG_PAGE } = require("./pages");

const iPhone = puppeteer.devices["iPhone 6"];

describe("/blog (Blog index Page)", () => {
  beforeAll(async () => {
    await page.emulate(iPhone);
    const response = await page.goto(BLOG_PAGE.url, {
      waitUntil: "networkidle2",
    });
    expect(response.ok());
    expect(page.url()).toEqual(BLOG_PAGE.url);
  });

  it("should load without error", async () => {
    expect(page.url()).toEqual(BLOG_PAGE.url);

    await page.screenshot({
      path: `e2e_tests/screenshots/blog_index_page.png`,
    });
  });

  it("should have a title", async () => {
    expect(await page.title()).toEqual(BLOG_PAGE.expected.title);
  });

  it("should many blog posts", async () => {
    // Top level page
    const pageTitle = await page.$("h1");
    expect(
      await (await pageTitle.getProperty("textContent")).jsonValue()
    ).toEqual("Blog Posts");

    // Assert that page has blog post titles
    const blogPostTitleElements = await page.$$("h3");
    const blogPostTitles = await Promise.all(
      blogPostTitleElements.map(async (blogTitleElement) => {
        return await (
          await blogTitleElement.getProperty("textContent")
        ).jsonValue();
      })
    );
    expect(blogPostTitles).toMatchSnapshot();
  });
});
