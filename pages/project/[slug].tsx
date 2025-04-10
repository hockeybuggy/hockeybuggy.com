import * as React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";
import Icon from "../../components/icon";

import { getProjectBySlug, getAllProjects } from "../../services/projects";
import { ProjectPresentor } from "../../services/presentors/project";
import {
  markdownToHtml,
  markdownToHtmlExcerpt,
} from "../../services/markdownToHtml";

import { Project } from "../../models/project";

interface Props {
  project: Project;
  html: string;
  excerpt: string;
  base64Placeholder: string;
  imgProps: any;
}

const ProjectPage = ({
  project,
  html,
  excerpt,
  base64Placeholder,
  imgProps,
}: Props): React.ReactElement => {
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
            href={ProjectPresentor.getUrlForProject(project)}
          >
            <Image
              alt={project.bannerAltText}
              placeholder="blur"
              blurDataURL={base64Placeholder}
              {...imgProps}
              src={require(`../../content/images/${project.bannerImageName}`)}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>
        ) : null}
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <hr />

      <Link href={`/projects/`}>◄ Back to projects</Link>
    </BaseLayout>
  );
};

export const getStaticProps = (async (context) => {
  const { params } = context;
  const slug = (params!.slug || "") as string;
  const project = getProjectBySlug(slug)!;
  const html = await markdownToHtml(project.content);
  const excerpt = await markdownToHtmlExcerpt(project.content);
  const { base64, img } = await getPlaiceholder(
    `/../content/images/${project.bannerImageName}`,
  );

  return {
    props: {
      project: {
        ...project,
      },
      html,
      excerpt,
      base64Placeholder: base64,
      imgProps: img,
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
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
}) satisfies GetStaticPaths;

export default ProjectPage;
