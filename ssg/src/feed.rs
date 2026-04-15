use crate::config::{AUTHOR_EMAIL, AUTHOR_NAME, BASE_URL};
use crate::content::{markdown::markdown_to_html, posts::Post};
use crate::url;

pub fn generate_feed(posts: &[Post]) -> String {
    // Use the most recent post date as the feed's updated timestamp
    let updated = posts
        .first()
        .map(|p| format!("{}T00:00:00Z", p.iso_date))
        .unwrap_or_else(|| "1970-01-01T00:00:00Z".to_string());

    let entries: String = posts
        .iter()
        .map(|post| render_entry(post))
        .collect();

    format!(
        r#"<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>{BASE_URL}/blog</id>
  <title>Hockeybuggy.com</title>
  <updated>{updated}</updated>
  <generator>hockeybuggy ssg</generator>
  <link rel="alternate" href="{BASE_URL}/blog"/>
  <link rel="self" href="{BASE_URL}/blog/index.xml"/>
  <author>
    <name>{AUTHOR_NAME}</name>
    <email>{AUTHOR_EMAIL}</email>
    <uri>{BASE_URL}/</uri>
  </author>
{entries}</feed>
"#
    )
}

fn render_entry(post: &Post) -> String {
    let post_url = format!("{BASE_URL}{}", url::url_for_post(&post.year, &post.month, &post.slug));
    let updated = format!("{}T00:00:00Z", post.iso_date);
    let content_html = markdown_to_html(&post.content);
    let title = escape_xml(&post.title);
    let content = escape_xml(&content_html);

    format!(
        r#"  <entry>
    <title type="html">{title}</title>
    <id>{post_url}</id>
    <link href="{post_url}"/>
    <updated>{updated}</updated>
    <content type="html">{content}</content>
    <author>
      <name>{AUTHOR_NAME}</name>
      <email>{AUTHOR_EMAIL}</email>
    </author>
  </entry>
"#
    )
}

fn escape_xml(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&apos;")
}
