use crate::config::BASE_URL;
use crate::content::{posts::Post, projects::Project};
use crate::url;

struct UrlEntry {
    loc: String,
    lastmod: Option<String>,
}

pub fn generate_sitemap(posts: &[Post], projects: &[Project]) -> String {
    let mut entries: Vec<UrlEntry> = Vec::new();

    // Homepage
    entries.push(UrlEntry { loc: BASE_URL.to_string(), lastmod: None });

    // Blog index
    entries.push(UrlEntry { loc: format!("{BASE_URL}/blog"), lastmod: None });

    // All blog posts (including delisted — they exist as pages)
    for post in posts {
        entries.push(UrlEntry {
            loc: format!("{BASE_URL}{}", url::url_for_post(&post.year, &post.month, &post.slug)),
            lastmod: Some(post.iso_date.clone()),
        });
    }

    // Categories index
    entries.push(UrlEntry { loc: format!("{BASE_URL}/blog/categories"), lastmod: None });

    // Per-category pages
    let mut categories: Vec<String> = {
        let mut seen = std::collections::HashSet::new();
        posts.iter()
            .flat_map(|p| p.categories.iter().cloned())
            .filter(|c| seen.insert(c.clone()))
            .collect()
    };
    categories.sort();
    for cat in &categories {
        entries.push(UrlEntry {
            loc: format!("{BASE_URL}{}", url::url_for_category(cat)),
            lastmod: None,
        });
    }

    // Tags index
    entries.push(UrlEntry { loc: format!("{BASE_URL}/blog/tags"), lastmod: None });

    // Per-tag pages
    let mut tags: Vec<String> = {
        let mut seen = std::collections::HashSet::new();
        posts.iter()
            .flat_map(|p| p.tags.iter().cloned())
            .filter(|t| seen.insert(t.clone()))
            .collect()
    };
    tags.sort();
    for tag in &tags {
        entries.push(UrlEntry {
            loc: format!("{BASE_URL}{}", url::url_for_tag(tag)),
            lastmod: None,
        });
    }

    // Projects index
    entries.push(UrlEntry { loc: format!("{BASE_URL}/projects"), lastmod: None });

    // Per-project pages
    for project in projects {
        entries.push(UrlEntry {
            loc: format!("{BASE_URL}{}", url::url_for_project(&project.slug)),
            lastmod: None,
        });
    }

    let url_elements: String = entries
        .iter()
        .map(|e| render_url(e))
        .collect();

    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{url_elements}
  </urlset>
"#
    )
}

fn render_url(entry: &UrlEntry) -> String {
    if let Some(lastmod) = &entry.lastmod {
        format!(
            "\n    <url>\n      <loc>{}</loc>\n      <lastmod>{lastmod}</lastmod>\n    </url>",
            entry.loc
        )
    } else {
        format!(
            "\n    <url>\n      <loc>{}</loc>\n    </url>",
            entry.loc
        )
    }
}
