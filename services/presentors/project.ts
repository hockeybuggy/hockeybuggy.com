import { Project } from "../../models/project";

import {
  markdownToHtml,
  markdownToHtmlExcerpt,
} from "../../services/markdownToHtml";

export class ProjectPresentor {
  static getUrlForProject(project: Project): string {
    return `/project/${project.slug}`;
  }

  static async getHtmlOfProject(project: Project): Promise<string> {
    const html = await markdownToHtml(project.content);
    return html;
  }

  static async getHtmlExcerptOfProject(project: Project): Promise<string> {
    const html = await markdownToHtmlExcerpt(project.content);
    return html;
  }
}
