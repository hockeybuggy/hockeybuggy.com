# AI Agents Guide

This document provides essential context, architectural understanding, and operational instructions for AI agents (such as Claude Code, GitHub Copilot, or Cursor) working within the `hockeybuggy.com` repository.

## 🎯 Project Overview
`hockeybuggy.com` is a personal website and blog for Douglas Anderson. It uses a static-site-generation-like approach within Next.js, where Markdown content is processed via custom scripts to generate RSS feeds and sitemates during the build process.

## 🏗️ Architecture & Data Flow

### Content Pipeline
1.  **Source:** Blog posts are authored as `.md` files (typically in a `content/` or similar directory, though check project structure for exact location).
2.  **Processing:** Custom scripts in `scripts/` (e.g., `build_blog_feed.ts`) parse these Markdown files.
3.  **Services Layer:** The `services/` directory contains the logic for:
    *   Markdown to HTML conversion (`markdownToHtml`).
    *   Data retrieval and presentation (`BlogPresentor`).
4.  **Output:** Generated content (like `public/blog/index.xml`) is updated during the build process.

### Frontend
*   **Framework:** Next.js (React) with TypeScript.
*   **Styling:** Sass (`.scss`) is used for component and global styling.
*   **Routing:** Uses the Next.js file-system based router.

## 🛠️ Development Workflow

### Essential Commands
| Task | Command |
| :--- | :--- |
| **Development Server** | `yarn dev` |
| **Production Build** | `yarn build` |
| **Linting** | `yarn lint` |
| **Type Checking** | `yarn typecheck` |
| **Formatting** | `yarn format` |
| **Pre-build Content Generation** | `yarn test:prebuild` |
| **Unit/Integration Tests** | `yarn test` |
| **E2E Tests (Puppeteer)** | `JEST_PUPPETEER_CONFIG=e2e_tests/jest-puppeteer.config.js jest --runInBand -c 'e2e_tests/jest.config.js'` |

### Adding a New Blog Post
1.  Create a new `.md` file in the content directory.
2.  Ensure it follows the required frontmatter structure (Title, Date, etc.).
3.  Run `yarn test:prebuild` to regenerate the RSS feed and sitemap locally.
4.  Verify the changes in the development server.

## 📜 Coding Standards & Rules

### TypeScript & JavaScript
*   **Strict Typing:** Always use explicit types; avoid `any`.
*   **Naming:** Use `camelCase` for functions/variables, `PascalCase` for React components, and `kebab-case` for filenames.
*   **Arrows:** Prefer arrow functions for React components.

### Styling
*   Use `.scss` files for styles.
*   Follow existing patterns for component-scoped or global Sass.

### Quality Assurance (The "Agent Manifesto")
1.  **Don't break the build:** Before submitting any change, ensure `yarn lint` and `yarn typecheck` pass.
2.  **Update Tests:** If you modify functionality, you **must** update/add corresponding tests in `test/` or `e2e_tests/`.
3.  **Accessibility (a11y):** Always write semantic HTML and ensure components are accessible to screen readers.
4.  **Content Integrity:** When modifying scripts that handle Markdown, always verify the output (RSS/Sitemap) is still valid.

## 📂 Directory Map (Key Folders)
*   `scripts/`: Build automation and content processing logic.
*   `services/`: Business logic, parsing, and data presentation.
*   `components/`: React UI components.
*   `public/`: Static assets and build-generated files.
*   `test/`: Unit and integration tests.
*   `e2e_tests/`: End-to-end browser testing configuration.
