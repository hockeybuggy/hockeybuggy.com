import remark from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import slug from "rehype-slug";
import remarkRehype from "remark-rehype";
import autolinkHeadings from "rehype-autolink-headings";
import stringify from "rehype-stringify";

export default async function markdownToHtml(
  markdown: string
): Promise<string> {
  const result = await remark()
    .use(html)
    .use(gfm)
    .use(remarkRehype)
    .use(slug)
    .use(autolinkHeadings)
    .use(stringify)
    .process(markdown);
  return result.toString();
}
