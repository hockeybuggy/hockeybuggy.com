import React from "react";
import { Link, PageProps, graphql } from "gatsby";

import SEO from "../../components/seo";
import { BaseLayout } from "../../layouts";

import { TagsPageQuery } from "../../__generated__/gatsby-types";

import kebabCase from "lodash/kebabCase";

const Tag = (tag: { totalCount: number; fieldValue: string }): JSX.Element => {
  return (
    <li key={tag.fieldValue}>
      <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
        {tag.fieldValue} ({tag.totalCount})
      </Link>
    </li>
  );
};

const TagsPage = ({ data }: PageProps<TagsPageQuery>): JSX.Element => {
  const group = data.allMarkdownRemark.group;
  return (
    <BaseLayout>
      <SEO title={"Tags"} />
      <div>
        <h1>Tags</h1>
        <ul>
          {group.map((e: any) => (
            <Tag key={e.fieldValue} {...e} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query TagsPage {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/content/blog/*" } }
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsPage;
