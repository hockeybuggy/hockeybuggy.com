pub mod pages;

use anyhow::Result;
use minijinja::Environment;

// Embed all templates at compile time so the binary is self-contained.
const TEMPLATE_BASE: &str = include_str!("../../templates/base.html");
const TEMPLATE_INDEX: &str = include_str!("../../templates/index.html");
const TEMPLATE_BLOG_INDEX: &str = include_str!("../../templates/blog/index.html");
const TEMPLATE_BLOG_POST: &str = include_str!("../../templates/blog/post.html");
const TEMPLATE_BLOG_TAGS: &str = include_str!("../../templates/blog/tags.html");
const TEMPLATE_BLOG_TAG: &str = include_str!("../../templates/blog/tag.html");
const TEMPLATE_BLOG_CATEGORIES: &str = include_str!("../../templates/blog/categories.html");
const TEMPLATE_BLOG_CATEGORY: &str = include_str!("../../templates/blog/category.html");
const TEMPLATE_PROJECTS_INDEX: &str = include_str!("../../templates/projects/index.html");
const TEMPLATE_PROJECT_SHOW: &str = include_str!("../../templates/projects/show.html");
const TEMPLATE_404: &str = include_str!("../../templates/404.html");

pub fn build_env() -> Result<Environment<'static>> {
    let mut env = Environment::new();
    env.add_template_owned("base.html", TEMPLATE_BASE.to_owned())?;
    env.add_template_owned("index.html", TEMPLATE_INDEX.to_owned())?;
    env.add_template_owned("blog/index.html", TEMPLATE_BLOG_INDEX.to_owned())?;
    env.add_template_owned("blog/post.html", TEMPLATE_BLOG_POST.to_owned())?;
    env.add_template_owned("blog/tags.html", TEMPLATE_BLOG_TAGS.to_owned())?;
    env.add_template_owned("blog/tag.html", TEMPLATE_BLOG_TAG.to_owned())?;
    env.add_template_owned("blog/categories.html", TEMPLATE_BLOG_CATEGORIES.to_owned())?;
    env.add_template_owned("blog/category.html", TEMPLATE_BLOG_CATEGORY.to_owned())?;
    env.add_template_owned("projects/index.html", TEMPLATE_PROJECTS_INDEX.to_owned())?;
    env.add_template_owned("projects/show.html", TEMPLATE_PROJECT_SHOW.to_owned())?;
    env.add_template_owned("404.html", TEMPLATE_404.to_owned())?;
    Ok(env)
}
