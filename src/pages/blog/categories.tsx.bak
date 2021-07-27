import React from "react";
import { Link, PageProps, graphql } from "gatsby";

import SEO from "../../components/seo";
import { BaseLayout } from "../../layouts";

import { CategoriesPageQuery } from "../../../graphql-types";

import kebabCase from "lodash/kebabCase";

const Category = (category: {
  totalCount: number;
  fieldValue: string;
}): JSX.Element => {
  return (
    <li key={category.fieldValue}>
      <Link to={`/blog/categories/${kebabCase(category.fieldValue)}/`}>
        {category.fieldValue} ({category.totalCount})
      </Link>
    </li>
  );
};

const CategoriesPage = ({
  data,
}: PageProps<CategoriesPageQuery>): JSX.Element => {
  const group = data.allMarkdownRemark.group;
  return (
    <BaseLayout>
      <SEO title={"Categories"} />
      <div>
        <h1>Categories</h1>
        <ul>
          {group.map((e: any) => (
            <Category key={e.fieldValue} {...e} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query CategoriesPage {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/content/blog/*" } }
      limit: 2000
    ) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default CategoriesPage;
