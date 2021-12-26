import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";

const md = new MarkdownIt();
md.use(prism, {
  defaultLangugage: "plaintext",
});

export async function markdownToHtml(markdown: string): Promise<string> {
  const excerptFreeMarkdown = markdown.replace("<!-- excerpt -->", "");
  return md.render(excerptFreeMarkdown);
}

export async function markdownToHtmlExcerpt(markdown: string): Promise<string> {
  const splits = markdown.split("<!-- excerpt -->");
  if (splits.length !== 2) {
    console.warn("Could not find `excerpt`");

    return "";
  }
  return md.render(splits[0]);
}
