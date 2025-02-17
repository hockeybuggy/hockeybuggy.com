import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { parseISO, format } from "date-fns";

import { Post } from "../models/blog";

const postsDirectory = join(process.cwd(), "content/blog/");

let postFilenamesCache: Array<string> | null = null;
const postCache: Record<string, Post> = {};

function getPostFilenames(): string[] {
  if (postFilenamesCache) {
    return postFilenamesCache;
  }
  const result = fs.readdirSync(postsDirectory);
  postFilenamesCache = result;
  return result;
}

export function getPostByFilename(postFilename: string): Post | null {
  const postFilenameWithoutSuffix = postFilename.replace(/\.md$/, "");

  if (postCache[postFilename]) {
    return postCache[postFilename];
  }

  const fullPath = join(postsDirectory, `${postFilenameWithoutSuffix}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const isoDate = data["date"];
  const isoEditDate = data["edit_date"] || null;
  const date = parseISO(isoDate);

  const result = {
    postFilename: postFilename,
    slug: data["slug"],
    title: data["title"],
    delisted: data["delisted"] || false,
    isoDate: isoDate,
    isoEditDate: isoEditDate,
    year: format(date, "uuuu"),
    month: format(date, "LL"),
    day: format(date, "dd"),
    content: content,
    tags: data.tags || [],
    categories: data.categories || [],
  };

  postCache[postFilename] = result;

  return result;
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

export function getCategoryCountsFromPosts(
  posts: Array<Post>,
): Record<string, number> {
  const postsGroupedByCategory: Record<string, number> = {};
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (postsGroupedByCategory[category] === undefined) {
        postsGroupedByCategory[category] = 1;
      } else {
        postsGroupedByCategory[category] += 1;
      }
    });
  });
  return postsGroupedByCategory;
}

export function getTagCountsFromPosts(
  posts: Array<Post>,
): Record<string, number> {
  const postsGroupedByTag: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tags) => {
      if (postsGroupedByTag[tags] === undefined) {
        postsGroupedByTag[tags] = 1;
      } else {
        postsGroupedByTag[tags] += 1;
      }
    });
  });
  return postsGroupedByTag;
}
