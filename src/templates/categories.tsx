import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import { BaseLayout } from "../layouts";
import SEO from "../components/seo";

import { CategoriesQuery } from "../__generated__/gatsby-types";

const Categories = ({
  pageContext,
  data,
}: PageProps<CategoriesQuery, { category: string }>): JSX.Element => {
  const { category } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  }  with the category "${category}"`;
  return (
    <BaseLayout>
      <SEO title={`Category: ${category}`} />
      <h1>{categoryHeader}</h1>
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
      <Link to="/blog/categories">All categories</Link>
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query Categories($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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

export default Categories;
