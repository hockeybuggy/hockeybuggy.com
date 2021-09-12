import remark from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import slug from "rehype-slug";
import autolinkHeadings from "rehype-autolink-headings";
import smartyPants from "remark-gfm";

export default async function markdownToHtml(
  markdown: string
): Promise<string> {
  const result = await remark()
    .use(html)
    .use(gfm)
    .use(smartyPants)
    .use(slug)
    .use(autolinkHeadings)
    .process(markdown);
  return result.toString();
}
