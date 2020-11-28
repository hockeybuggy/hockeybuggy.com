import React from "react";
import { PageProps, graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

import { BaseLayout } from "../layouts";
import SEO from "../components/seo";

import { ProjectBySlugQuery } from "../../graphql-types";

const ProjectTemplate = ({
  data
}: PageProps<ProjectBySlugQuery>): JSX.Element => {
  const projectImages = data.projectImages.edges;
  const projectImagesByPath: Record<string, FluidObject> = projectImages.reduce(
    (accum: Record<string, FluidObject>, edge) => {
      const path = `${edge.node!.relativeDirectory}/${edge.node!.base}`;
      accum[path] = edge.node!.childImageSharp!.fluid! as FluidObject;
      return accum;
    },
    {}
  );

  const { title, bannerImageName } = data.projectBySlug!.frontmatter!;
  const excerpt = data.projectBySlug!.excerpt!;
  const html = data.projectBySlug!.html!;
  const bannerImage = projectImagesByPath[bannerImageName!];

  return (
    <BaseLayout className="project">
      <SEO title={`Project: ${title!}`} description={excerpt} />
      <article>
        <header>
          <h1 className="project-title">{title}</h1>
        </header>
        {bannerImage ? <Img fluid={bannerImage} /> : null}
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
      </article>
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!, $imagesSlug: String!) {
    projectBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        bannerImageName
      }
    }
    projectImages: allFile(
      filter: { relativeDirectory: { glob: $imagesSlug } }
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

export default ProjectTemplate;
