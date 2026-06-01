#!/usr/bin/env node
// Development server with live reload. Builds the site with the Rust SSG,
// watches the sources, rebuilds on change, and pushes a reload to the browser
// over Server-Sent Events. Built-ins only — no extra dependencies.
//
// This is intentionally separate from serve_static.js: that server must return
// the built bytes verbatim for the e2e tests, whereas this one injects a small
// live-reload snippet into every HTML response.

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const PORT = 4000;
const ROOT = path.join(__dirname, "dist");

// Source directories that should trigger a rebuild when they change.
const WATCH_DIRS = ["ssg/src", "ssg/templates", "styles", "public", "content"];

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

// Snippet injected before </body> so the page reconnects after each rebuild.
const LIVE_RELOAD_SNIPPET = `
<script>
  (function () {
    var source = new EventSource("/__livereload");
    source.onmessage = function () { window.location.reload(); };
    source.onerror = function () { /* server restarting; EventSource retries */ };
  })();
</script>`;

// Open SSE connections, notified after every successful build.
const clients = new Set();

function notifyReload() {
  for (const res of clients) {
    res.write("data: reload\n\n");
  }
}

let building = false;
let buildQueued = false;

// Run the SSG once. Coalesces overlapping requests: if a change arrives during
// a build, exactly one more build is scheduled afterwards.
function build() {
  if (building) {
    buildQueued = true;
    return;
  }
  building = true;

  const child = spawn(
    "cargo",
    ["run", "--quiet", "--manifest-path", "ssg/Cargo.toml"],
    { stdio: "inherit", cwd: __dirname },
  );

  child.on("close", (code) => {
    building = false;
    if (code === 0) {
      notifyReload();
    } else {
      console.error(`Build failed (exit ${code}); not reloading.`);
    }
    if (buildQueued) {
      buildQueued = false;
      build();
    }
  });
}

// Track file modification times. macOS FSEvents reports a "change" for every
// public/ file the SSG *reads* while copying it into dist/ — those bump access
// time, not modification time. Gating on mtime lets us ignore that read-storm
// (which otherwise rebuilds forever) while still catching genuine edits.
const mtimes = new Map();

function snapshot(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      snapshot(abs);
    } else {
      try {
        mtimes.set(abs, fs.statSync(abs).mtimeMs);
      } catch {}
    }
  }
}

// True only for a real change: a file whose mtime advanced, a new file, or a
// previously seen file that was removed. Read-induced events return false.
function hasChanged(abs) {
  let stat;
  try {
    stat = fs.statSync(abs);
  } catch {
    return mtimes.delete(abs); // genuine removal if we were tracking it
  }
  if (stat.isDirectory()) return false;
  const prev = mtimes.get(abs);
  if (prev === undefined || stat.mtimeMs > prev) {
    mtimes.set(abs, stat.mtimeMs);
    return true;
  }
  return false;
}

let debounce = null;
function scheduleBuild() {
  clearTimeout(debounce);
  debounce = setTimeout(build, 100);
}

function watch() {
  for (const dir of WATCH_DIRS) {
    const abs = path.join(__dirname, dir);
    if (!fs.existsSync(abs)) continue;
    snapshot(abs);
    fs.watch(abs, { recursive: true }, (_event, file) => {
      // The SSG regenerates these on every build; reacting to them would loop.
      if (file && (path.basename(file) === "sitemap.xml" || path.basename(file) === "index.xml")) return;
      // Without a filename we can't check mtime; treat as real (rare on macOS).
      if (file && !hasChanged(path.join(abs, file))) return;
      scheduleBuild();
    });
  }
}

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
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

function serveHtml(filePath, res, statusCode) {
  let html = fs.readFileSync(filePath, "utf8");
  html = html.includes("</body>")
    ? html.replace("</body>", `${LIVE_RELOAD_SNIPPET}\n</body>`)
    : html + LIVE_RELOAD_SNIPPET;
  res.writeHead(statusCode, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  res.end(html);
}

const server = http.createServer((req, res) => {
  if (req.url === "/__livereload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("retry: 1000\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  const filePath = resolve(req.url);

  if (!filePath) {
    const notFound = path.join(ROOT, "404.html");
    if (fs.existsSync(notFound)) {
      serveHtml(notFound, res, 404);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") {
    serveHtml(filePath, res, 200);
    return;
  }

  res.writeHead(200, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Dev server on http://localhost:${PORT}/ (live reload enabled)`);
  build();
  watch();
});
