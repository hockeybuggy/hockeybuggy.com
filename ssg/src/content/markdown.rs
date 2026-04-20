use pulldown_cmark::{Options, Parser, html};

/// Render full markdown to HTML, removing the excerpt marker.
pub fn markdown_to_html(markdown: &str) -> String {
    let clean = markdown.replace("<!-- excerpt -->", "");
    render_markdown(&clean)
}

/// Render only the excerpt portion (before <!-- excerpt -->).
pub fn markdown_to_excerpt(markdown: &str) -> String {
    let parts: Vec<&str> = markdown.splitn(2, "<!-- excerpt -->").collect();
    if parts.is_empty() {
        return String::new();
    }
    render_markdown(parts[0])
}

fn render_markdown(markdown: &str) -> String {
    let opts = Options::ENABLE_TABLES
        | Options::ENABLE_FOOTNOTES
        | Options::ENABLE_STRIKETHROUGH
        | Options::ENABLE_TASKLISTS
        | Options::ENABLE_SMART_PUNCTUATION;
    let parser = Parser::new_ext(markdown, opts);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    html_output
}
