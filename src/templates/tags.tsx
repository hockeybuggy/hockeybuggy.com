import React from "react";

import { PageProps, Link, graphql } from "gatsby";

import { TagsQuery } from "../../graphql-types";

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
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const slug = node.frontmatter!.slug!;
          const year = node.frontmatter!.year!;
          const month = node.frontmatter!.month!;
          const title = node.frontmatter!.title!;
          return (
            <li key={slug}>
              <Link to={`/blog/${year}/${month}/${slug}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </div>
  );
};

export default Tags;

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
