import fs from "fs";
import { join } from "path";

import matter from "gray-matter";
import { parseISO, format } from "date-fns";

import markdownToHtml from "../services/markdownToHtml";

const postsDirectory = join(process.cwd(), "content/blog/");

export type Post = {
  postFilename: string;
  slug: string;
  isoDate: string;
  year: string;
  month: string;
  day: string;
  title: string;
  content: string;
  categories: string[];
  tags: string[];
};

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

export class BlogPresentor {
  static getUrlForPost(post: Post): string {
    const { year, month, slug } = post;
    return `/blog/post/${year}/${month}/${slug}`;
  }

  static getDateOfPost(post: Post): Date {
    return parseISO(post.isoDate);
  }

  static getHumanReadableDateOfPost(post: Post): string {
    return format(BlogPresentor.getDateOfPost(post), "yyyy-MM-dd");
  }

  static async getHtmlOfPost(post: Post): Promise<string> {
    const html = await markdownToHtml(post.content || "");
    return html;
  }
}
