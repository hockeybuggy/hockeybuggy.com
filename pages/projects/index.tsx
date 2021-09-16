import * as React from "react";
import { GetStaticPropsResult } from "next";
import Image from "next/image";
import Link from "next/link";

import { Project } from "../../models/project";
import { getAllProjects } from "../../services/projects";
import { ProjectPresentor } from "../../services/presentors/project";
import { markdownToHtmlExcerpt } from "../../services/markdownToHtml";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";
import Icon from "../../components/icon";

interface Props {
  projects: Project[];
  projectExcerpts: string[];
}

const ProjectsIndex = ({ projects, projectExcerpts }: Props): JSX.Element => {
  return (
    <BaseLayout className="projects" pathname={"/projects/"}>
      <SEO title={"Projects"} />

      <h1>Projects</h1>
      {projects.map((project, i) => {
        const excerpt = projectExcerpts[i];

        const title = project.title || project.slug;

        return (
          <article key={project.slug}>
            <div className="header-row">
              <header>
                <h2>{title}</h2>
              </header>
              {project.github ? (
                <div className="github-link">
                  <a aria-label="Project's GitHub page" href={project.github}>
                    <Icon
                      name={Icon.Names.GitHub}
                      aria-hidden="true"
                      label=""
                      size={Icon.Sizes.Large}
                    />
                  </a>
                </div>
              ) : null}
            </div>
            {project.bannerImageName ? (
              <Link
                aria-label={`Read more about ${title}`}
                href={ProjectPresentor.getUrlForProject(project)}
              >
                <a>
                  <div className="banner-image-container">
                    <Image
                      src={require(`../../content/images/${project.bannerImageName}`)}
                    />
                  </div>
                </a>
              </Link>
            ) : null}
            <div
              className="excerpt"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <div className="read-more">
              <Link href={`/project/${project.slug}`}>Read more</Link>
            </div>
          </article>
        );
      })}
    </BaseLayout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const projects = getAllProjects();
  const projectExcerpts = await Promise.all(
    projects.map(async (project) => {
      const excerpt = await markdownToHtmlExcerpt(project.content);
      return excerpt;
    })
  );

  return {
    props: { projects, projectExcerpts },
  };
}

export default ProjectsIndex;
