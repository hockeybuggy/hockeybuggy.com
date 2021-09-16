import remark from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import prism from "remark-prism";
import excerpt from "remark-excerpt";
import slug from "rehype-slug";
import remarkRehype from "remark-rehype";
import autolinkHeadings from "rehype-autolink-headings";
import stringify from "rehype-stringify";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(html)
    .use(prism)
    .use(remarkRehype)
    .use(slug)
    .use(autolinkHeadings)
    .use(stringify)
    .process(markdown);
  return result.toString();
}

export async function markdownToHtmlExcerpt(markdown: string): Promise<string> {
  const result = await remark()
    .use(html)
    .use(gfm)
    .use(excerpt)
    .process(markdown);
  return result.toString();
}
