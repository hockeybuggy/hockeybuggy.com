import { writeFileSync, mkdirSync } from "fs";

import { getAllPosts } from "../services/blog";
import { getAllProjects } from "../services/projects";
import { BlogPresentor } from "../services/presentors/blog";
import { ProjectPresentor } from "../services/presentors/project";

// Based roughly on this: https://www.sitemaps.org/protocol.html
interface SiteMapPageInfo {
  loc: string;
  lastmod?: string;
}

function generateSiteMap(pages: Array<SiteMapPageInfo>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ loc, lastmod }) => {
         return `
       <url>
           <loc>${`${loc}`}</loc>
           ${lastmod ? `<lastmod>${`${lastmod}`}</lastmod>` : ""}
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

const BASE = "https://hockeybuggy.com";

async function generate() {
  console.log("Generating Sitemap...");

  const pages: Array<SiteMapPageInfo> = [
    {
      loc: `${BASE}`,
    },
  ];

  console.log("Adding pages for the blog...");
  pages.push({
    loc: `${BASE}/blog/`,
  });
  const allPosts = getAllPosts();
  const allListedPosts = allPosts.filter((post) => !post.delisted);
  allListedPosts.forEach((post) => {
    const postUrl = `${BASE}${BlogPresentor.getUrlForPost(post)}`;
    const postLastMod = post.isoDate;
    pages.push({
      loc: postUrl,
      lastmod: postLastMod,
    });
  });

  console.log("Adding pages for the projects...");
  pages.push({
    loc: `${BASE}/projects/`,
  });
  const allProjects = getAllProjects();
  allProjects.forEach((project) => {
    const projectUrl = `${BASE}${ProjectPresentor.getUrlForProject(project)}`;
    pages.push({ loc: projectUrl });
  });

  const sitemap = generateSiteMap(pages);
  mkdirSync("public", { recursive: true });
  writeFileSync("public/sitemap.xml", sitemap);

  console.log("Done.");
}

generate();
