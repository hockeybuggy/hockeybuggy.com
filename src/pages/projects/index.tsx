import * as React from "react";
import { PageProps, graphql } from "gatsby";
import Link from "gatsby-link";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";
import Icon from "../../components/icon";

import { ProjectsIndexPageQuery } from "../../../graphql-types";

const ProjectsIndex = ({
  data,
}: PageProps<ProjectsIndexPageQuery>): JSX.Element => {
  const projects = data.allProjects.edges;

  return (
    <BaseLayout pathname={"/projects/"}>
      <SEO title={"Projects"} />

      <h1>Projects</h1>
      {projects.map(({ node }) => {
        const frontmatter = node!.frontmatter!;
        const excerpt = node!.excerpt!;
        const slug = frontmatter.slug!;
        const github = frontmatter.github;
        const title = frontmatter.title || slug;
        return (
          <article key={slug}>
            <header>
              <h3 style={{ margin: 0, marginBottom: "1.8rem" }}>
                <Link to={`/project/${slug}`}>{title}</Link>
                {github ? (
                  <a aria-label="Project's GitHub page" href={github}>
                    <Icon
                      name={Icon.Names.GitHub}
                      aria-hidden="true"
                      label=""
                    />
                  </a>
                ) : null}
              </h3>
            </header>
            <section className="excerpt">{excerpt}</section>
            <hr />
          </article>
        );
      })}
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query ProjectsIndexPage {
    site {
      siteMetadata {
        title
      }
    }
    allProjects: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/content/projects/*" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          frontmatter {
            title
            github
            slug
          }
        }
      }
    }
  }
`;

export default ProjectsIndex;
