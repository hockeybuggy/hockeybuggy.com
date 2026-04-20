---
title: Switching to a custom static site generator
slug: "custom-static-site-generator"
date: "2026-04-19"
tags:
- development
categories:
- meta
---

In the long tradition of this blog: content about rewriting how the site is
built.

Until recently this site was a Next.js app. It now builds from a small static
site generator written in Rust that renders [MiniJinja][MINIJINJA] templates.

<!-- excerpt -->

Next.js was doing much more than this site needed. The output was always
static HTML (nothing client-side or server-rendered), and there were a lot of
Node dependencies that changed often.

One thing I liked about this rewrite is that none of the content in the
`content/` directory had to change.

The existing E2E suite (Jest + Puppeteer) became the spec for the rewrite. I
pointed the tests at the output of the Rust generator and worked through the
failures until the output the program was writing to the `dist/` directory
matched the Next.js output.

[MINIJINJA]: https://github.com/mitsuhiko/minijinja
