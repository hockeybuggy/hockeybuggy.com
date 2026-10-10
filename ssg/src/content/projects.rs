use anyhow::{Context, Result};
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use std::fs;

#[derive(Debug, Deserialize)]
struct ProjectFrontmatter {
    title: Option<String>,
    slug: String,
    order: i32,
    edit_date: Option<NaiveDate>,
    github: Option<String>,
    #[serde(rename = "bannerImageName")]
    banner_image_name: Option<String>,
    #[serde(rename = "bannerAltText")]
    banner_alt_text: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Project {
    pub filename: String,
    pub title: String,
    pub slug: String,
    pub order: i32,
    pub iso_edit_date: Option<String>,
    pub github: Option<String>,
    pub banner_image_name: Option<String>,
    pub banner_alt_text: String,
    pub content: String,
}

fn parse_project(filename: &str, raw: &str) -> Result<Project> {
    let raw = raw.trim_start_matches('\u{feff}');
    let without_leading = raw.strip_prefix("---\n").unwrap_or(raw);
    let (yaml_part, content_part) = without_leading
        .split_once("\n---")
        .with_context(|| format!("No closing --- in {filename}"))?;
    let content = content_part
        .strip_prefix('\n')
        .unwrap_or(content_part)
        .to_string();

    let fm: ProjectFrontmatter = serde_yaml::from_str(yaml_part)
        .with_context(|| format!("Failed to parse frontmatter in {filename}"))?;

    Ok(Project {
        filename: filename.to_string(),
        title: fm.title.unwrap_or_else(|| fm.slug.clone()),
        slug: fm.slug,
        order: fm.order,
        iso_edit_date: fm.edit_date.map(|date| date.to_string()),
        github: fm.github,
        banner_image_name: fm.banner_image_name,
        banner_alt_text: fm.banner_alt_text.unwrap_or_default(),
        content,
    })
}

pub fn load_all_projects() -> Result<Vec<Project>> {
    let dir = std::path::Path::new("content/projects");
    let mut projects = Vec::new();

    for entry in fs::read_dir(dir).context("Reading content/projects")? {
        let entry = entry?;
        let path = entry.path();
        if path.extension().and_then(|e| e.to_str()) != Some("md") {
            continue;
        }
        let filename = path.file_name().unwrap().to_string_lossy().into_owned();
        let raw =
            fs::read_to_string(&path).with_context(|| format!("Reading {}", path.display()))?;
        let project = parse_project(&filename, &raw)?;
        projects.push(project);
    }

    // Sort ascending by order
    projects.sort_by_key(|p| p.order);
    Ok(projects)
}

impl Project {
    pub fn url_path(&self) -> String {
        crate::url::url_for_project(&self.slug)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn invalid_edit_dates_are_rejected() {
        let raw = "---\nslug: example\norder: 1\nedit_date: 2026-02-30\n---\nBody.";
        assert!(parse_project("example.md", raw).is_err());
    }

    #[test]
    fn projects_without_edit_dates_omit_modified_labels() {
        let project =
            parse_project("example.md", "---\nslug: example\norder: 1\n---\nBody.").unwrap();
        let env = crate::render::build_env().unwrap();
        let index =
            crate::render::pages::render_projects_index(&env, std::slice::from_ref(&project))
                .unwrap();
        let detail = crate::render::pages::render_project_page(&env, &project).unwrap();

        for html in [index, detail] {
            assert!(!html.contains("Last modified:"));
        }
    }
}
