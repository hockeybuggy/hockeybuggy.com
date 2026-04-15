mod config;
mod content;
mod feed;
mod render;
mod sitemap;
mod url;

use anyhow::{Context, Result};
use std::collections::HashSet;
use std::fs;
use std::path::Path;

fn main() -> Result<()> {
    println!("Building site...");

    // Load content first so we can write sitemap/feed to public/ before copying.
    let posts = content::posts::load_all_posts().context("Loading blog posts")?;
    let projects = content::projects::load_all_projects().context("Loading projects")?;
    println!("  {} posts, {} projects", posts.len(), projects.len());

    // Generate sitemap → public/ (prebuild tests read from here)
    let sitemap_xml = sitemap::generate_sitemap(&posts, &projects);
    fs::create_dir_all("public").context("Creating public/")?;
    fs::write("public/sitemap.xml", &sitemap_xml).context("Writing public/sitemap.xml")?;

    // Generate atom feed → public/blog/
    let feed_xml = feed::generate_feed(&posts);
    fs::create_dir_all("public/blog").context("Creating public/blog/")?;
    fs::write("public/blog/index.xml", &feed_xml).context("Writing public/blog/index.xml")?;

    // Clean and recreate dist/
    let dist = Path::new("dist");
    if dist.exists() {
        fs::remove_dir_all(dist).context("Removing dist/")?;
    }
    fs::create_dir_all(dist).context("Creating dist/")?;

    // Copy public/ → dist/
    copy_dir("public", dist).context("Copying public/ to dist/")?;

    // Copy content/images/ → dist/static/img/content/
    let img_dest = dist.join("static/img/content");
    if Path::new("content/images").exists() {
        copy_dir("content/images", &img_dest).context("Copying content/images/")?;
    }

    // Compile SCSS → dist/styles/main.css
    let css = grass::from_path("styles/main.scss", &grass::Options::default())
        .map_err(|e| anyhow::anyhow!("SCSS compilation failed: {e}"))?;
    fs::create_dir_all(dist.join("styles")).context("Creating dist/styles/")?;
    fs::write(dist.join("styles/main.css"), css).context("Writing dist/styles/main.css")?;

    // Copy nav.js → dist/assets/nav.js
    fs::create_dir_all(dist.join("assets")).context("Creating dist/assets/")?;
    fs::copy("ssg/assets/nav.js", dist.join("assets/nav.js"))
        .context("Copying nav.js")?;

    // Build template environment
    let env = render::build_env().context("Building template environment")?;

    // Render pages
    println!("  Rendering pages...");

    write_page(dist, "index.html", render::pages::render_index(&env)?)?;
    write_page(dist, "404.html", render::pages::render_404(&env)?)?;
    write_page(dist, "blog/index.html", render::pages::render_blog_index(&env, &posts)?)?;
    write_page(dist, "blog/tags/index.html", render::pages::render_tags_index(&env, &posts)?)?;
    write_page(dist, "blog/categories/index.html", render::pages::render_categories_index(&env, &posts)?)?;
    write_page(dist, "projects/index.html", render::pages::render_projects_index(&env, &projects)?)?;

    // Blog posts
    for post in &posts {
        let path = format!("blog/post/{}/{}/{}/index.html", post.year, post.month, post.slug);
        write_page(dist, &path, render::pages::render_blog_post(&env, post)?)?;
    }

    // Tag pages
    let all_tags: HashSet<String> = posts.iter().flat_map(|p| p.tags.iter().cloned()).collect();
    for tag in &all_tags {
        let path = format!("blog/tags/{}/index.html", url::to_slug(tag));
        write_page(dist, &path, render::pages::render_tag_page(&env, tag, &posts)?)?;
    }

    // Category pages
    let all_cats: HashSet<String> = posts.iter().flat_map(|p| p.categories.iter().cloned()).collect();
    for cat in &all_cats {
        let path = format!("blog/categories/{}/index.html", url::to_slug(cat));
        write_page(dist, &path, render::pages::render_category_page(&env, cat, &posts)?)?;
    }

    // Project pages
    for project in &projects {
        let path = format!("project/{}/index.html", project.slug);
        write_page(dist, &path, render::pages::render_project_page(&env, project)?)?;
    }

    println!("Build complete → dist/");
    Ok(())
}

/// Write HTML to dist/<rel_path>, creating parent directories as needed.
fn write_page(dist: &Path, rel_path: &str, html: String) -> Result<()> {
    let full = dist.join(rel_path);
    if let Some(parent) = full.parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(&full, html).with_context(|| format!("Writing {}", full.display()))?;
    Ok(())
}

/// Recursively copy src directory into dst directory.
fn copy_dir(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> Result<()> {
    let src = src.as_ref();
    let dst = dst.as_ref();
    fs::create_dir_all(dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        let dest_path = dst.join(entry.file_name());
        if ty.is_dir() {
            copy_dir(entry.path(), &dest_path)?;
        } else {
            fs::copy(entry.path(), &dest_path)?;
        }
    }
    Ok(())
}
