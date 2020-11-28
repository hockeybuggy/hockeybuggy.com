import * as React from "react";
import { PageProps, graphql } from "gatsby";
import Link from "gatsby-link";
import Img, { FluidObject } from "gatsby-image";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";
import Icon from "../../components/icon";

import { ProjectsIndexPageQuery } from "../../../graphql-types";

const ProjectsIndex = ({
  data
}: PageProps<ProjectsIndexPageQuery>): JSX.Element => {
  const projects = data.allProjects.edges;

  const projectImages = data.allProjectImages.edges;
  const projectImagesByPath: Record<string, FluidObject> = projectImages.reduce(
    (accum: Record<string, FluidObject>, edge) => {
      const path = `${edge.node!.relativeDirectory}/${edge.node!.base}`;
      accum[path] = edge.node!.childImageSharp!.fluid! as FluidObject;
      return accum;
    },
    {}
  );

  return (
    <BaseLayout pathname={"/projects/"}>
      <SEO title={"Projects"} />

      <h1>Projects</h1>
      {projects.map(({ node }) => {
        const frontmatter = node!.frontmatter!;
        const excerpt = node!.excerpt!;
        const slug = frontmatter.slug!;
        const github = frontmatter.github;
        const bannerImageName = frontmatter.bannerImageName!;
        const bannerImage = projectImagesByPath[bannerImageName];

        const title = frontmatter.title || slug;

        return (
          <article key={slug}>
            <header>
              <h3 style={{ margin: 0, marginBottom: "1.8rem" }}>
                <Link to={`/project/${slug}`}>{title}</Link>
              </h3>
            </header>
            {github ? (
              <div>
                <a aria-label="Project's GitHub page" href={github}>
                  <Icon name={Icon.Names.GitHub} aria-hidden="true" label="" />
                </a>
              </div>
            ) : null}
            {bannerImage ? <Img fluid={bannerImage} /> : null}
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
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          frontmatter {
            title
            github
            slug
            bannerImageName
          }
        }
      }
    }
    allProjectImages: allFile(
      filter: { relativeDirectory: { glob: "projects/**" } }
    ) {
      edges {
        node {
          base
          relativeDirectory
          childImageSharp {
            fluid {
              aspectRatio
              base64
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`;

export default ProjectsIndex;
