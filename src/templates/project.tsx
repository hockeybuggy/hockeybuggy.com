import React from "react";
import { PageProps, graphql } from "gatsby";

import { BaseLayout } from "../layouts";
import SEO from "../components/seo";

import { ProjectBySlugQuery } from "../../graphql-types";

const ProjectTemplate = ({
  data,
}: PageProps<ProjectBySlugQuery>): JSX.Element => {
  const { title } = data.projectBySlug!.frontmatter!;
  const excerpt = data.projectBySlug!.excerpt!;
  const html = data.projectBySlug!.html!;

  return (
    <BaseLayout className="project">
      <SEO title={`Project: ${title!}`} description={excerpt} />
      <article>
        <header>
          <h1 className="project-title">{title}</h1>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
      </article>
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    projectBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`;

export default ProjectTemplate;
