import { parseISO, format } from "date-fns";

import { Post } from "../../models/blog";

import markdownToHtml from "../../services/markdownToHtml";


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
