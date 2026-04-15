# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Test Commands
- Development: `yarn dev`
- Build: `yarn build`
- Lint: `yarn lint`
- Type check: `yarn typecheck`
- Format code: `yarn format`
- Prebuild tests: `yarn test:prebuild`
- E2E tests: `yarn test:e2e`
- Run single E2E test: `JEST_PUPPETEER_CONFIG=e2e_tests/jest-puppeteer.config.js jest --runInBand -c 'e2e_tests/jest.config.js' -t 'test name'`

## Code Style Guidelines
- TypeScript with strict type checking
- React for UI components
- Next.js for routing and build system
- Use absolute imports; types should be explicit when not inferrable
- Files use kebab-case, components use PascalCase, functions use camelCase
- Arrow functions preferred for React components
- Four-space indentation with Prettier for formatting
- ESLint for code quality (run `yarn lint` before commits)
- Semantic HTML and accessible components (JSX a11y)
- Update tests when modifying functionality