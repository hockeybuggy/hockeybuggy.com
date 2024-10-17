import fs from "node:fs";
import { XmlDocument } from "libxml2-wasm";

async function loadSitemap() {
  const document = XmlDocument.fromString(
    fs.readFileSync("./public/sitemap.xml").toString()
  );

  return document;
}

function extractUrlsFromSitemap(sitemap: XmlDocument) {
  const urlElements = sitemap.find("*");
  const urls = urlElements.map((ele) => {
    const children = ele.find("*");
    const name = children[0].find("*")[0].content;
    let lastmod = null;
    if (children.length > 1) {
      lastmod = children[1].find("*")[0].content;
    }
    return { name, lastmod };
  });

  return urls;
}

describe("Sitemap", () => {
  it("should have a version and encoding", async () => {
    const subject = await loadSitemap();
    expect(subject.get("version")).toEqual("1.0");
    expect(subject.get("encoding")).toEqual("UTF-8");

    subject.dispose();
  });

  it("should have a schema listed", async () => {
    const subject = await loadSitemap();
    const urlsetNode = subject.root!;
    expect(urlsetNode!.namespaceUri).toEqual(
      "http://www.sitemaps.org/schemas/sitemap/0.9"
    );

    subject.dispose();
  });

  it("should have pages for the index", async () => {
    const subject = await loadSitemap();

    const urls = extractUrlsFromSitemap(subject);
    const urlNames = urls.map((url) => url.name);
    // index page
    expect(urlNames).toContain("https://hockeybuggy.com");

    subject.dispose();
  });

  it("should have pages for the blog", async () => {
    const subject = await loadSitemap();

    const urls = extractUrlsFromSitemap(subject);
    const urlNames = urls.map((url) => url.name);
    // index page for the blog
    expect(urlNames).toContain("https://hockeybuggy.com/blog");

    const blogPostPattern = /\/blog\/post/;
    const blogPosts = urls.filter((url) => blogPostPattern.test(url.name));
    // There are post pages. 10 is an arbitary number.
    expect(blogPosts.length).toBeGreaterThan(10);
    // All the blog posts have a lastmod date
    expect(
      blogPosts.map((post) => post.lastmod).every((post) => post !== null)
    ).toBe(true);

    // tags pages
    expect(urlNames).toContain("https://hockeybuggy.com/blog/tags");
    const blogTagPattern = /\/blog\/tags/;
    const blogTagPages = urls.filter((url) => blogTagPattern.test(url.name));
    // There are tag pages. 10 is an arbitary number.
    expect(blogTagPages.length).toBeGreaterThan(10);

    // categories pages
    expect(urlNames).toContain("https://hockeybuggy.com/blog/categories");
    const blogCategoriesPattern = /\/blog\/categories/;
    const blogCategoriesPages = urls.filter((url) =>
      blogCategoriesPattern.test(url.name)
    );
    // There are category pages. 4 is an arbitary number.
    expect(blogCategoriesPages.length).toBeGreaterThan(4);

    subject.dispose();
  });

  it("should have pages for the project", async () => {
    const subject = await loadSitemap();

    const urls = extractUrlsFromSitemap(subject);
    const urlNames = urls.map((url) => url.name);
    // index page for the projects
    expect(urlNames).toContain("https://hockeybuggy.com/projects");

    const projectPagePattern = /\/project\/\w*/;
    const projectPages = urls.filter((url) =>
      projectPagePattern.test(url.name)
    );
    // There are post pages. 5 is an arbitary number.
    expect(projectPages.length).toBeGreaterThan(5);
    subject.dispose();
  });
});
