use anyhow::Result;
use minijinja::Environment;
use serde::Serialize;
use std::collections::HashMap;

use crate::content::{markdown, posts::Post, projects::Project};
use crate::url;

// ── context types ────────────────────────────────────────────────────────────

#[derive(Serialize)]
struct PostSummary {
    title: String,
    url: String,
    iso_date: String,
    human_date: String,
}

#[derive(Serialize)]
struct PostLink {
    title: String,
    url: String,
}

#[derive(Serialize)]
struct TagSummary {
    name: String,
    count: usize,
    url: String,
}

#[derive(Serialize)]
struct ProjectSummary {
    title: String,
    url: String,
    excerpt_html: String,
    banner_image_url: Option<String>,
    banner_alt_text: String,
    github: Option<String>,
}

// ── helpers ──────────────────────────────────────────────────────────────────

fn render<S: Serialize>(env: &Environment, tpl: &str, ctx: S) -> Result<String> {
    let tmpl = env.get_template(tpl)?;
    Ok(tmpl.render(ctx)?)
}

fn post_to_summary(post: &Post) -> PostSummary {
    PostSummary {
        title: post.title.clone(),
        url: post.url_path(),
        iso_date: post.iso_date.clone(),
        human_date: post.human_date(),
    }
}

fn post_to_link(post: &Post) -> PostLink {
    PostLink {
        title: post.title.clone(),
        url: post.url_path(),
    }
}

fn banner_url(name: &str) -> String {
    format!("/static/img/content/{name}")
}

// ── page renderers ───────────────────────────────────────────────────────────

pub fn render_index(env: &Environment) -> Result<String> {
    render(
        env,
        "index.html",
        minijinja::context! {
            title => "The personal website of Douglas Anderson",
            pathname => "/",
            class => "centered",
            show_rss_link => false,
        },
    )
}

pub fn render_blog_index(env: &Environment, posts: &[Post]) -> Result<String> {
    let summaries: Vec<PostSummary> = posts
        .iter()
        .filter(|p| !p.delisted)
        .map(post_to_summary)
        .collect();
    render(
        env,
        "blog/index.html",
        minijinja::context! {
            title => "Blog",
            pathname => "/blog/",
            class => "",
            show_rss_link => true,
            posts => summaries,
        },
    )
}

pub fn render_blog_post(env: &Environment, post: &Post) -> Result<String> {
    let html_content = markdown::markdown_to_html(&post.content);

    let categories_links: Vec<PostLink> = post
        .categories
        .iter()
        .map(|c| PostLink {
            title: c.clone(),
            url: url::url_for_category(c),
        })
        .collect();
    let tags_links: Vec<PostLink> = post
        .tags
        .iter()
        .map(|t| PostLink {
            title: t.clone(),
            url: url::url_for_tag(t),
        })
        .collect();

    render(
        env,
        "blog/post.html",
        minijinja::context! {
            title => post.title.clone(),
            pathname => "",
            class => "post",
            show_rss_link => true,
            iso_date => post.iso_date.clone(),
            iso_edit_date => post.iso_edit_date.clone(),
            human_date => post.human_date(),
            human_edit_date => post.human_edit_date(),
            categories => categories_links,
            tags => tags_links,
            html_content => html_content,
        },
    )
}

pub fn render_tags_index(env: &Environment, posts: &[Post]) -> Result<String> {
    let mut counts: HashMap<String, usize> = HashMap::new();
    for post in posts {
        for tag in &post.tags {
            *counts.entry(tag.clone()).or_insert(0) += 1;
        }
    }
    let mut tags: Vec<TagSummary> = counts
        .into_iter()
        .map(|(name, count)| TagSummary {
            url: url::url_for_tag(&name),
            name,
            count,
        })
        .collect();
    tags.sort_by(|a, b| a.name.cmp(&b.name));

    render(
        env,
        "blog/tags.html",
        minijinja::context! {
            title => "Tags",
            pathname => "/blog/tags/",
            class => "",
            show_rss_link => true,
            tags => tags,
        },
    )
}

pub fn render_tag_page(env: &Environment, tag: &str, posts: &[Post]) -> Result<String> {
    let post_links: Vec<PostLink> = posts
        .iter()
        .filter(|p| p.tags.contains(&tag.to_string()))
        .map(post_to_link)
        .collect();

    render(
        env,
        "blog/tag.html",
        minijinja::context! {
            title => format!("Tag: {tag}"),
            pathname => "",
            class => "",
            show_rss_link => true,
            tag => tag,
            posts => post_links,
        },
    )
}

pub fn render_categories_index(env: &Environment, posts: &[Post]) -> Result<String> {
    let mut counts: HashMap<String, usize> = HashMap::new();
    for post in posts {
        for cat in &post.categories {
            *counts.entry(cat.clone()).or_insert(0) += 1;
        }
    }
    let mut categories: Vec<TagSummary> = counts
        .into_iter()
        .map(|(name, count)| TagSummary {
            url: url::url_for_category(&name),
            name,
            count,
        })
        .collect();
    categories.sort_by(|a, b| a.name.cmp(&b.name));

    render(
        env,
        "blog/categories.html",
        minijinja::context! {
            title => "Categories",
            pathname => "/blog/categories/",
            class => "",
            show_rss_link => true,
            categories => categories,
        },
    )
}

pub fn render_category_page(env: &Environment, category: &str, posts: &[Post]) -> Result<String> {
    let post_links: Vec<PostLink> = posts
        .iter()
        .filter(|p| p.categories.contains(&category.to_string()))
        .map(post_to_link)
        .collect();

    render(
        env,
        "blog/category.html",
        minijinja::context! {
            title => format!("Category: {category}"),
            pathname => "",
            class => "",
            show_rss_link => true,
            category => category,
            posts => post_links,
        },
    )
}

pub fn render_projects_index(env: &Environment, projects: &[Project]) -> Result<String> {
    let summaries: Vec<ProjectSummary> = projects
        .iter()
        .map(|p| ProjectSummary {
            title: p.title.clone(),
            url: p.url_path(),
            excerpt_html: markdown::markdown_to_excerpt(&p.content),
            banner_image_url: p.banner_image_name.as_deref().map(banner_url),
            banner_alt_text: p.banner_alt_text.clone(),
            github: p.github.clone(),
        })
        .collect();

    render(
        env,
        "projects/index.html",
        minijinja::context! {
            title => "Projects",
            pathname => "/projects/",
            class => "projects",
            show_rss_link => false,
            projects => summaries,
        },
    )
}

pub fn render_project_page(env: &Environment, project: &Project) -> Result<String> {
    let html_content = markdown::markdown_to_html(&project.content);
    render(
        env,
        "projects/show.html",
        minijinja::context! {
            title => format!("Project: {}", project.title),
            pathname => "",
            class => "",
            show_rss_link => false,
            project_title => project.title.clone(),
            project_slug => project.slug.clone(),
            github => project.github.clone(),
            banner_image_url => project.banner_image_name.as_deref().map(banner_url),
            banner_alt_text => project.banner_alt_text.clone(),
            html_content => html_content,
        },
    )
}

pub fn render_404(env: &Environment) -> Result<String> {
    render(
        env,
        "404.html",
        minijinja::context! {
            title => "404 – Page not found",
            pathname => "",
            class => "",
            show_rss_link => false,
        },
    )
}
