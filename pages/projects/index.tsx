import * as React from "react";
import { GetStaticPropsResult } from "next";
import Image from "next/image";
import Link from "next/link";

import { Project, getAllProjects } from "../../services/projects";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";
import Icon from "../../components/icon";

interface Props {
  allProjects: Project[];
}

const ProjectsIndex = ({ allProjects }: Props): JSX.Element => {
  return (
    <BaseLayout className="projects" pathname={"/projects/"}>
      <SEO title={"Projects"} />

      <h1>Projects</h1>
      {allProjects.map((project) => {
        const excerpt = ""; // TODO add excerpt
        // const bannerImageName = project.bannerImageName;

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
                href={`/project/${project.slug}`}
              >
                <a>
                  <Image
                    src={require(`../../content/images/${project.bannerImageName}`)}
                  />
                </a>
              </Link>
            ) : null}
            <section className="excerpt">
              <p>{excerpt}</p>
            </section>
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
  const allProjects = getAllProjects();

  return {
    props: { allProjects },
  };
}

export default ProjectsIndex;
