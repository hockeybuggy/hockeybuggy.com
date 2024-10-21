import { parseISO, format } from "date-fns";
import kebabCase from "lodash/kebabCase";

import { Post } from "../../models/blog";

export class BlogPresentor {
  static getUrlForPost(post: Post): string {
    const { year, month, slug } = post;
    return `/blog/post/${year}/${month}/${slug}`;
  }

  static getUrlForCategoryPage(category: string): string {
    return `/blog/categories/${kebabCase(category)}`;
  }

  static getUrlForTagPage(tag: string): string {
    return `/blog/tags/${kebabCase(tag)}`;
  }

  static getDateOfPost(post: Post): Date {
    return parseISO(post.isoDate);
  }

  static getEditDateOfPost(post: Post): Date | null {
    return post.isoEditDate ? parseISO(post.isoEditDate) : null;
  }

  static getHumanReadableDateOfPost(post: Post): string {
    return format(BlogPresentor.getDateOfPost(post), "yyyy-MM-dd");
  }

  static getHumanReadableEditDateOfPost(post: Post): string | null {
    const editDate = BlogPresentor.getEditDateOfPost(post);
    return editDate ? format(editDate, "yyyy-MM-dd") : null;
  }
}
