import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import { BaseLayout } from "../layouts";
import SEO from "../components/seo";

import { TagsQuery } from "../__generated__/gatsby-types";

const Tags = ({
  pageContext,
  data,
}: PageProps<TagsQuery, { tag: string }>): JSX.Element => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;
  return (
    <BaseLayout>
      <SEO title={`Tag: ${tag}`} />
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const slug = node.frontmatter!.slug!;
          const year = node.frontmatter!.year!;
          const month = node.frontmatter!.month!;
          const title = node.frontmatter!.title!;
          return (
            <li key={slug}>
              <Link to={`/blog/post/${year}/${month}/${slug}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <Link to="/blog/tags">All tags</Link>
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query Tags($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
          }
        }
      }
    }
  }
`;

export default Tags;
