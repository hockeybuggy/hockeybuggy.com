# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See `AGENTS.md` for a full architecture overview.

## Build/Test Commands
- Build the site: `yarn build` (runs the Rust SSG, output to `dist/`)
- Dev build: `yarn dev`
- Serve `dist/` locally: `yarn start`
- Prebuild tests: `yarn test:prebuild`
- E2E tests: `yarn test:e2e`
- Run single E2E test: `JEST_PUPPETEER_CONFIG=e2e_tests/jest-puppeteer.config.js jest --runInBand -c 'e2e_tests/jest.config.js' -t 'test name'`
- Rust tests: `cargo test --manifest-path ssg/Cargo.toml`
- Rust format / lint: `cargo fmt --manifest-path ssg/Cargo.toml --check` and `cargo clippy --manifest-path ssg/Cargo.toml -- -D warnings`

## Code Style Guidelines
- Rust SSG lives under `ssg/`. Run `cargo fmt` and `cargo clippy` before committing Rust changes.
- Templates are MiniJinja under `ssg/templates/`. Keep logic in Rust; templates should stay presentational.
- Styles are Sass under `styles/`, compiled by `grass` during the build.
- Remaining TypeScript is Jest test code (`prebuild_tests/`, `e2e_tests/`); keep it minimal.
- Files use kebab-case, functions use camelCase in TS. Four-space indentation.
- Semantic HTML and accessible markup in templates.
- Update tests when modifying functionality.
