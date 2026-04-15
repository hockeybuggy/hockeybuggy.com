#!/usr/bin/env node
// Simple static file server that serves index.html from directories WITHOUT
// redirecting. Required because the e2e tests check page.url() === original URL.

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 4000;
const ROOT = path.join(__dirname, "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

function resolve(urlPath) {
  // Strip query string and decode
  const clean = decodeURIComponent(urlPath.split("?")[0]);

  // Candidate paths in order of preference
  const candidates = [
    path.join(ROOT, clean),
    path.join(ROOT, clean, "index.html"),
    path.join(ROOT, clean.replace(/\/$/, ""), "index.html"),
  ];

  for (const candidate of candidates) {
    try {
      const stat = fs.statSync(candidate);
      if (stat.isFile()) return candidate;
      if (stat.isDirectory()) {
        const idx = path.join(candidate, "index.html");
        if (fs.existsSync(idx)) return idx;
      }
    } catch {}
  }
  return null;
}

const server = http.createServer((req, res) => {
  const filePath = resolve(req.url);

  if (!filePath) {
    // Serve 404.html if present, otherwise plain text
    const notFound = path.join(ROOT, "404.html");
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      fs.createReadStream(notFound).pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-cache" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Serving dist/ at http://localhost:${PORT}/`);
});
