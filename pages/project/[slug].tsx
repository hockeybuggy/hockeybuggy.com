import * as React from "react";
import { GetStaticPropsResult, GetStaticPathsResult } from "next";
import Link from "next/link";
import Image from "next/image";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";
import Icon from "../../components/icon";

import markdownToHtml from "../../services/markdownToHtml";
import {
  Project,
  getProjectBySlug,
  getAllProjects,
} from "../../services/projects";

interface Props {
  project: Project;
  html: string;
}

const ProjectPage = ({ project, html }: Props): JSX.Element => {
  const excerpt = ""; // TODO get an exceprt

  return (
    <BaseLayout className="project">
      <SEO title={`Project: ${project.title!}`} description={excerpt} />

      <article>
        <div className="header-row">
          <header>
            <h1 className="project-title">{project.title}</h1>
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
            aria-label={`Read more about ${project.title}`}
            href={`/project/${project.slug}`}
          >
            <a>
              <Image
                src={require(`../../content/images/${project.bannerImageName}`)}
              />
            </a>
          </Link>
        ) : null}
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <hr />

      <Link href={`/projects/`}>◄ Back to projects</Link>
    </BaseLayout>
  );
};

type Params = {
  params: {
    year: string;
    month: string;
    slug: string;
  };
};

export async function getStaticProps({
  params,
}: Params): Promise<GetStaticPropsResult<Props>> {
  const project = getProjectBySlug(params.slug)!;
  const html = await markdownToHtml(project.content || "");

  return {
    props: {
      project: {
        ...project,
      },
      html,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const projects = getAllProjects();
  const paths = projects.map((project) => {
    return {
      params: {
        slug: project.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default ProjectPage;
