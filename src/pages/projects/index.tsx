import * as React from "react";
import { PageProps, graphql } from "gatsby";
import Link from "gatsby-link";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";

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
        const slug = frontmatter.slug!;
        const title = frontmatter.title || slug;
        return (
          <article key={slug}>
            <header>
              <h3 style={{ margin: 0, marginBottom: "1.8rem" }}>
                <Link to={`/project/${slug}`}>{title}</Link>
              </h3>
            </header>
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
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;

export default ProjectsIndex;
