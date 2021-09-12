import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

const projectDirectory = join(process.cwd(), "content/projects/");

export type Project = {
  projectFilename: string;
  order: string;
  slug: string;
  title: string;
  github: string | null;
  bannerImageName: string;
  content: string;
};

function getProjectFilenames(): string[] {
  return fs.readdirSync(projectDirectory);
}

export function getProjectByFilename(projectFilename: string): Project | null {
  const projectFilenameWithoutSuffix = projectFilename.replace(/\.md$/, "");
  const fullPath = join(projectDirectory, `${projectFilenameWithoutSuffix}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    projectFilename: projectFilename,
    content: content,
    bannerImageName: data["bannerImageName"],
    slug: data["slug"],
    order: data["order"],
    title: data["title"],
    github: data["github"] || null,
  };
}

export function getAllProjects(): Project[] {
  const fileNames = getProjectFilenames();
  const projects = fileNames
    .map((fileName) => getProjectByFilename(fileName)!)
    .filter((project) => project !== null)
    // sort projects by order
    .sort((project1, project2) => (project1.order < project2.order ? -1 : 1));
  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().filter((project) => project.slug === slug)[0];
}
