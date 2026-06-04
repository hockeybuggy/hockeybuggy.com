import { test, expect, Page } from '@playwright/test';

type SitemapUrl = { name: string; lastmod: string | null };

type SitemapData = {
  xmlVersion: string | null;
  xmlEncoding: string | null;
  namespaceURI: string | null;
  urls: Array<SitemapUrl>;
};

async function fetchSitemap(page: Page): Promise<SitemapData> {
  await page.goto('/');

  return await page.evaluate(async (sitemapUrl: string) => {
    const response = await fetch(sitemapUrl);
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "application/xml");

    const urls = Array.from(doc.getElementsByTagName("url")).map((urlEl) => {
      const loc = urlEl.getElementsByTagName("loc")[0]?.textContent ?? "";
      const lastmodEl = urlEl.getElementsByTagName("lastmod")[0];
      return {
        name: loc,
        lastmod: lastmodEl ? lastmodEl.textContent : null,
      };
    });

    return {
      xmlVersion: doc.xmlVersion,
      xmlEncoding: doc.xmlEncoding,
      namespaceURI: doc.documentElement.namespaceURI,
      urls,
    };
  }, '/sitemap.xml');
}

test.describe("Sitemap", () => {
  test("should have a version and encoding", async ({ page }) => {
    const subject = await fetchSitemap(page);
    expect(subject.xmlVersion).toEqual("1.0");
    expect(subject.xmlEncoding).toEqual("UTF-8");
  });

  test("should have a schema listed", async ({ page }) => {
    const subject = await fetchSitemap(page);
    expect(subject.namespaceURI).toEqual(
      "http://www.sitemaps.org/schemas/sitemap/0.9",
    );
  });

  test("should have pages for the index", async ({ page }) => {
    const subject = await fetchSitemap(page);
    const urlNames = subject.urls.map((url) => url.name);
    expect(urlNames).toContain("https://hockeybuggy.com");
  });

  test("should have pages for the blog", async ({ page }) => {
    const subject = await fetchSitemap(page);
    const urlNames = subject.urls.map((url) => url.name);
    expect(urlNames).toContain("https://hockeybuggy.com/blog");

    const blogPostPattern = /\/blog\/post/;
    const blogPosts = subject.urls.filter((url) =>
      blogPostPattern.test(url.name),
    );
    expect(blogPosts.length).toBeGreaterThan(10);
    expect(
      blogPosts.map((post) => post.lastmod).every((post) => post !== null),
    ).toBe(true);

    expect(urlNames).toContain("https://hockeybuggy.com/blog/tags");
    const blogTagPattern = /\/blog\/tags/;
    const blogTagPages = subject.urls.filter((url) =>
      blogTagPattern.test(url.name),
    );
    expect(blogTagPages.length).toBeGreaterThan(10);

    expect(urlNames).toContain("https://hockeybuggy.com/blog/categories");
    const blogCategoriesPattern = /\/blog\/categories/;
    const blogCategoriesPages = subject.urls.filter((url) =>
      blogCategoriesPattern.test(url.name),
    );
    expect(blogCategoriesPages.length).toBeGreaterThan(4);
  });

  test("should have pages for the project", async ({ page }) => {
    const subject = await fetchSitemap(page);
    const urlNames = subject.urls.map((url) => url.name);
    expect(urlNames).toContain("https://hockeybuggy.com/projects");

    const projectPagePattern = /\/project\/\w*/;
    const projectPages = subject.urls.filter((url) =>
      projectPagePattern.test(url.name),
    );
    expect(projectPages.length).toBeGreaterThan(5);
  });
});
