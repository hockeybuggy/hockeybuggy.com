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
});
