# AI Agents Guide

This document provides context for AI agents working within the
`hockeybuggy.com` repository.

## Project Overview

`hockeybuggy.com` is a personal website and blog for Douglas Anderson. It is a
fully static site built by a small custom Rust static site generator in
[`ssg/`](./ssg).

## Architecture

### Content Pipeline

1. **Source:** Blog posts and project descriptions are authored as `.md` files
   with YAML frontmatter under [`content/`](./content).
2. **Generator:** [`ssg/`](./ssg) is a Rust binary crate (`cargo run
   --manifest-path ssg/Cargo.toml`). Key modules:
   - `src/main.rs` — entrypoint, wires the pipeline.
   - `src/content/` — Markdown parsing (via `pulldown-cmark`) and frontmatter
     deserialization.
   - `src/render/` — page rendering via MiniJinja templates.
   - `src/sitemap.rs`, `src/feed.rs` — sitemap.xml and RSS feed generation.
   - `src/url.rs`, `src/config.rs` — URL helpers and site constants.
3. **Templates:** MiniJinja templates in [`ssg/templates/`](./ssg/templates).
4. **Styles:** Sass sources under [`styles/`](./styles) are compiled with
   `grass` during the build. Static JS assets live under
   [`ssg/assets/`](./ssg/assets).
5. **Output:** The full site is written to `dist/`, which is what Netlify
   publishes.

### Testing

- `prebuild_tests/` — Jest tests that validate generated artifacts (e.g. the
  sitemap). Run with `yarn test:prebuild` after a build.
- `e2e_tests/` — Puppeteer-driven Jest tests that hit the built site served by
  `serve_static.js`. Run with `yarn test:e2e` (or `./scripts/test`).

## Development Workflow

### Essential Commands

| Task | Command |
| :--- | :--- |
| Build the site | `yarn build` |
| Dev build (debug) | `yarn dev` |
| Serve built `dist/` | `yarn start` |
| Prebuild tests | `yarn test:prebuild` |
| E2E tests | `yarn test:e2e` |
| Rust tests | `cargo test --manifest-path ssg/Cargo.toml` |
| Rust format check | `cargo fmt --manifest-path ssg/Cargo.toml --check` |
| Rust lints | `cargo clippy --manifest-path ssg/Cargo.toml -- -D warnings` |

### Adding a New Blog Post

1. Use `./scripts/new_post` to scaffold a Markdown file under `content/`.
2. Fill in the frontmatter (title, date, tags, categories) and the body.
3. Run `yarn build` and browse the result via `yarn start`.
4. `yarn test:prebuild` will verify the sitemap picks up the new post.

## Coding Standards

### Rust (`ssg/`)

- Keep modules focused; prefer small functions that return `anyhow::Result`
  at the boundaries.
- Run `cargo fmt` and `cargo clippy` before committing.

### Templates, Markdown, Styles

- Templates: MiniJinja. Keep logic in Rust; templates should be presentational.
- Markdown: standard CommonMark plus YAML frontmatter.
- Styles: Sass under `styles/`. Follow the existing partial structure.

### Test code (TypeScript)

- The remaining `.ts` in this repo is Jest test code. Keep it simple; avoid
  pulling in heavy dependencies.

## Directory Map

- `ssg/` — Rust static site generator (source, templates, static JS assets).
- `styles/` — Sass partials compiled into `dist/styles/main.css` by the SSG.
- `content/` — Markdown source for blog posts and projects.
- `public/` — Raw static files copied into the build (CNAME, robots.txt, etc.).
- `dist/` — Build output (gitignored, produced by `yarn build`).
- `prebuild_tests/` — Jest tests that run against the built `dist/`.
- `e2e_tests/` — Puppeteer end-to-end tests.
- `scripts/` — Helper scripts (new post, dev server, test runner).
