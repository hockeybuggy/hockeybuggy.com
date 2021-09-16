import { Project } from "../../models/project";

export class ProjectPresentor {
  static getUrlForProject(project: Project): string {
    return `/project/${project.slug}`;
  }
}
