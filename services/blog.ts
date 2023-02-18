import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { parseISO, format } from "date-fns";

import { Post } from "../models/blog";

const postsDirectory = join(process.cwd(), "content/blog/");

function getPostFilenames(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostByFilename(postFilename: string): Post | null {
  const postFilenameWithoutSuffix = postFilename.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${postFilenameWithoutSuffix}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const isoDate = data["date"];
  const date = parseISO(isoDate);

  return {
    postFilename: postFilename,
    slug: data["slug"],
    title: data["title"],
    delisted: data["delisted"] || false,
    isoDate: isoDate,
    year: format(date, "uuuu"),
    month: format(date, "LL"),
    day: format(date, "dd"),
    content: content,
    tags: data.tags || [],
    categories: data.categories || [],
  };
}

export function getAllPosts(): Post[] {
  const fileNames = getPostFilenames();
  const posts = fileNames
    .map((fileName) => getPostByFilename(fileName)!)
    .filter((post) => post !== null)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.isoDate > post2.isoDate ? -1 : 1));
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().filter((post) => post.slug === slug)[0];
}
