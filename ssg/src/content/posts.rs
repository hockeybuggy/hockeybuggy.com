use anyhow::{Context, Result};
use chrono::{DateTime, Datelike, FixedOffset, NaiveDate};
use serde::{Deserialize, Serialize};
use std::fs;

/// Parse "YYYY-MM-DD" or full RFC3339 datetime; returns the UTC calendar date.
fn parse_date(s: &str) -> Result<NaiveDate> {
    if s.contains('T') {
        let dt = DateTime::<FixedOffset>::parse_from_rfc3339(s)
            .with_context(|| format!("RFC3339 parse failed for '{s}'"))?;
        // Convert to UTC so year/month/day are timezone-stable
        Ok(dt.with_timezone(&chrono::Utc).date_naive())
    } else {
        NaiveDate::parse_from_str(s, "%Y-%m-%d")
            .with_context(|| format!("Date parse failed for '{s}'"))
    }
}

#[derive(Debug, Deserialize)]
struct PostFrontmatter {
    title: Option<String>,
    slug: String,
    date: String,
    edit_date: Option<String>,
    delisted: Option<bool>,
    tags: Option<Vec<String>>,
    categories: Option<Vec<String>>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Post {
    pub filename: String,
    pub title: String,
    pub slug: String,
    pub iso_date: String,
    pub iso_edit_date: Option<String>,
    pub year: String,
    pub month: String,
    pub day: String,
    pub delisted: bool,
    pub tags: Vec<String>,
    pub categories: Vec<String>,
    pub content: String,
}

fn parse_post(filename: &str, raw: &str) -> Result<Post> {
    // Split on "---" frontmatter delimiter
    let raw = raw.trim_start_matches('\u{feff}'); // strip BOM if present
    let without_leading = raw.strip_prefix("---\n").unwrap_or(raw);
    let (yaml_part, content_part) = without_leading
        .split_once("\n---")
        .with_context(|| format!("No closing --- in {filename}"))?;
    // Skip the rest of the closing --- line (e.g. "\n---\n..." → content starts after next newline)
    let content = content_part
        .strip_prefix('\n')
        .unwrap_or(content_part)
        .to_string();

    let fm: PostFrontmatter = serde_yaml::from_str(yaml_part)
        .with_context(|| format!("Failed to parse frontmatter in {filename}"))?;

    // Support both "YYYY-MM-DD" and full RFC3339 "YYYY-MM-DDTHH:MM:SS±HH:MM".
    // Full timestamps are treated as UTC so the URL year/month and <time datetime>
    // attribute match what the TypeScript code produced on a UTC CI machine.
    let date = parse_date(&fm.date)
        .with_context(|| format!("Invalid date '{}' in {filename}", fm.date))?;
    let iso_date = format!("{:04}-{:02}-{:02}", date.year(), date.month(), date.day());

    Ok(Post {
        filename: filename.to_string(),
        title: fm.title.unwrap_or_else(|| fm.slug.clone()),
        slug: fm.slug,
        iso_date,
        iso_edit_date: fm.edit_date,
        year: format!("{:04}", date.year()),
        month: format!("{:02}", date.month()),
        day: format!("{:02}", date.day()),
        delisted: fm.delisted.unwrap_or(false),
        tags: fm.tags.unwrap_or_default(),
        categories: fm.categories.unwrap_or_default(),
        content,
    })
}

pub fn load_all_posts() -> Result<Vec<Post>> {
    let dir = std::path::Path::new("content/blog");
    let mut posts = Vec::new();

    for entry in fs::read_dir(dir).context("Reading content/blog")? {
        let entry = entry?;
        let path = entry.path();
        if path.extension().and_then(|e| e.to_str()) != Some("md") {
            continue;
        }
        let filename = path
            .file_name()
            .unwrap()
            .to_string_lossy()
            .into_owned();
        let raw = fs::read_to_string(&path)
            .with_context(|| format!("Reading {}", path.display()))?;
        let post = parse_post(&filename, &raw)?;
        posts.push(post);
    }

    // Sort descending by iso_date
    posts.sort_by(|a, b| b.iso_date.cmp(&a.iso_date));
    Ok(posts)
}

// --- helpers used by templates / sitemap / feed ---

impl Post {
    pub fn url_path(&self) -> String {
        crate::url::url_for_post(&self.year, &self.month, &self.slug)
    }

    pub fn human_date(&self) -> String {
        self.iso_date.clone()
    }

    pub fn human_edit_date(&self) -> Option<String> {
        self.iso_edit_date.clone()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_simple_post() {
        let raw = "---\ntitle: Hello\nslug: hello\ndate: \"2024-01-15\"\n---\n\nBody text.";
        let post = parse_post("test.md", raw).unwrap();
        assert_eq!(post.title, "Hello");
        assert_eq!(post.slug, "hello");
        assert_eq!(post.year, "2024");
        assert_eq!(post.month, "01");
        assert_eq!(post.day, "15");
    }
}
