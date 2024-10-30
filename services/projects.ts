import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

import { Project } from "../models/project";

const projectDirectory = join(process.cwd(), "content/projects/");

let projectFilenamesCache: Array<string> | null = null;
const projectCache: Record<string, Project> = {};

function getProjectFilenames(): string[] {
  if (projectFilenamesCache) {
    return projectFilenamesCache;
  }
  const result = fs.readdirSync(projectDirectory);
  projectFilenamesCache = result;
  return result;
}

export function getProjectByFilename(projectFilename: string): Project | null {
  const projectFilenameWithoutSuffix = projectFilename.replace(/\.md$/, "");
  if (projectCache[projectFilename]) {
    return projectCache[projectFilename];
  }

  const fullPath = join(projectDirectory, `${projectFilenameWithoutSuffix}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const result = {
    projectFilename: projectFilename,
    content: content,
    bannerImageName: data["bannerImageName"],
    bannerAltText: data["bannerAltText"],
    slug: data["slug"],
    order: data["order"],
    title: data["title"],
    github: data["github"] || null,
  };

  projectCache[projectFilename] = result;

  return result;
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
