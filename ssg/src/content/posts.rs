use anyhow::{Context, Result};
use chrono::Datelike;
use serde::{Deserialize, Serialize};
use std::fs;

use super::date::parse_date;

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
    let edit_date = fm
        .edit_date
        .as_deref()
        .map(parse_date)
        .transpose()
        .with_context(|| format!("Invalid edit_date in {filename}"))?;

    Ok(Post {
        filename: filename.to_string(),
        title: fm.title.unwrap_or_else(|| fm.slug.clone()),
        slug: fm.slug,
        iso_date,
        iso_edit_date: edit_date.map(|date| date.to_string()),
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
        let filename = path.file_name().unwrap().to_string_lossy().into_owned();
        let raw =
            fs::read_to_string(&path).with_context(|| format!("Reading {}", path.display()))?;
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
    fn edit_dates_are_normalized() {
        for (value, expected) in [
            ("2026-02-28", "2026-02-28"),
            ("2014-10-03T23:30:00-04:00", "2014-10-04"),
        ] {
            let raw =
                format!("---\nslug: example\ndate: 2014-01-01\nedit_date: \"{value}\"\n---\nBody.");
            let post = parse_post("example.md", &raw).unwrap();
            assert_eq!(post.iso_edit_date.as_deref(), Some(expected));
        }
    }

    #[test]
    fn invalid_edit_dates_are_rejected() {
        let raw = "---\nslug: example\ndate: 2014-01-01\nedit_date: 2026-02-30\n---\nBody.";
        let error = parse_post("example.md", raw).unwrap_err();
        assert!(format!("{error:#}").contains("edit_date"));
    }

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
