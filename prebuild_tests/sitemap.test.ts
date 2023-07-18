import { open } from "node:fs/promises";
import { parseXmlAsync } from "libxmljs";

async function loadSitemap() {
  const file = await open("./public/sitemap.xml");

  const document = parseXmlAsync(await file.readFile());

  return document;
}

describe("Sitemap", () => {
  it("should have a version and encoding", async () => {
    const subject = await loadSitemap();
    expect(subject.version()).toEqual("1.0");
    expect(subject.encoding()).toEqual("UTF-8");
  });

  it("should have a urlset that contains urls", async () => {
    const subject = await loadSitemap();
    // The root node (the `urlset`) has a reference to the sitemap schema
    const urlsetNode = subject.root()!;
    expect(urlsetNode!.namespace()!.href()).toEqual(
      "http://www.sitemaps.org/schemas/sitemap/0.9"
    );

    expect(subject.childNodes().length).toBeGreaterThan(1);
    // Here we assume that the first url is the home page
    const exampleUrlNode = urlsetNode.get(".url");
    console.log(exampleUrlNode);
    // expect(exampleUrlNode.childNodes().length).toEqual(1);
    // expect(exampleUrlNode.get("loc")!).toEqual("https://hockeybuggy.com");
    expect(true).toBe(false);
  });

  it.todo("should have pages for the blog");
  // index page
  // The blog posts have a lastmod date
  // post pages
  // tags pages
  // categories pages

  it.todo("should have pages for the project");
  // index page
  // project pages
});
