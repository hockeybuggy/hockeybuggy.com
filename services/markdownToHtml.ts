import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";

const md = new MarkdownIt();
md.use(prism, {
  defaultLangugage: "plaintext",
});

export async function markdownToHtml(markdown: string): Promise<string> {
  return md.render(markdown);
}

export async function markdownToHtmlExcerpt(markdown: string): Promise<string> {
  // TODO split manually. I was unable to find a markdown-it plugin that worked
  // in a similar way to the remark or rehype excerpt plugins.
  return md.render(markdown);
}
