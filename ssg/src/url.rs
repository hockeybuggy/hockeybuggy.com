/// /blog/post/YYYY/MM/slug
pub fn url_for_post(year: &str, month: &str, slug: &str) -> String {
    format!("/blog/post/{year}/{month}/{slug}")
}

/// /blog/categories/<slug>
pub fn url_for_category(category: &str) -> String {
    format!("/blog/categories/{}", to_slug(category))
}

/// /blog/tags/<slug>
pub fn url_for_tag(tag: &str) -> String {
    format!("/blog/tags/{}", to_slug(tag))
}

/// /project/<slug>
pub fn url_for_project(slug: &str) -> String {
    format!("/project/{slug}")
}

/// Match lodash.kebabCase: lowercase, split on non-alphanumeric, join with "-".
pub fn to_slug(s: &str) -> String {
    s.to_lowercase()
        .split(|c: char| !c.is_alphanumeric())
        .filter(|p| !p.is_empty())
        .collect::<Vec<_>>()
        .join("-")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn to_slug_single_word() {
        assert_eq!(to_slug("development"), "development");
        assert_eq!(to_slug("vim"), "vim");
        assert_eq!(to_slug("meta"), "meta");
    }

    #[test]
    fn to_slug_spaces() {
        assert_eq!(to_slug("foo bar"), "foo-bar");
    }

    #[test]
    fn url_for_post_format() {
        assert_eq!(
            url_for_post("2024", "11", "fancy-loading-state"),
            "/blog/post/2024/11/fancy-loading-state"
        );
    }
}
