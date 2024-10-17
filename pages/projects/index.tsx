import * as React from "react";
import { GetStaticPropsResult } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import { Project } from "../../models/project";
import { getAllProjects } from "../../services/projects";
import { ProjectPresentor } from "../../services/presentors/project";
import { markdownToHtmlExcerpt } from "../../services/markdownToHtml";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";
import Icon from "../../components/icon";

interface Props {
  projects: Array<Project>;
  projectExcerpts: Array<string>;
  projectImages: Array<Record<"img" | "base64", any>>;
}

const ProjectsIndex = ({
  projects,
  projectExcerpts,
  projectImages,
}: Props): React.ReactElement => {
  return (
    <BaseLayout className="projects" pathname={"/projects/"}>
      <SEO title={"Projects"} />

      <h1>Projects</h1>
      {projects.map((project, i) => {
        const excerpt = projectExcerpts[i];
        const imgProps = projectImages[i].img;
        const base64Placeholder = projectImages[i].base64;

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
                      width="100%"
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
                <div className="banner-image-container">
                  <Image
                    alt={project.bannerAltText}
                    placeholder="blur"
                    blurDataURL={base64Placeholder}
                    {...imgProps}
                    src={require(
                      `../../content/images/${project.bannerImageName}`,
                    )}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </Link>
            ) : null}
            <div
              className="excerpt"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <div className="read-more">
              <Link href={ProjectPresentor.getUrlForProject(project)}>
                Read more
              </Link>
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
    }),
  );
  const projectImages = await Promise.all(
    projects.map(async (project) => {
      const { base64, img } = await getPlaiceholder(
        `/../content/images/${project.bannerImageName}`,
      );
      return { base64, img };
    }),
  );

  return {
    props: { projects, projectExcerpts, projectImages },
  };
}

export default ProjectsIndex;
