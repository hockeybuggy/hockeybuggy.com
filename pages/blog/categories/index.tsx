import React from "react";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";

import { BaseLayout } from "../../../layouts";
import SEO from "../../../components/seo";

import { getAllPosts } from "../../../services/blog";

interface Props {
  postsGroupedByCategory: Record<string, number>;
}

const Tag = ({
  category,
  count,
}: {
  category: string;
  count: number;
}): JSX.Element => {
  return (
    <li key={category}>
      <Link href={`/blog/categories/${kebabCase(category)}/`}>
        <a>
          {category} ({count})
        </a>
      </Link>
    </li>
  );
};

const CategoriesIndexPage = ({
  postsGroupedByCategory,
}: Props): JSX.Element => {
  return (
    <BaseLayout>
      <SEO title={"Categories"} />
      <div>
        <h1>Tags</h1>
        <ul>
          {Object.entries(postsGroupedByCategory).map(([category, value]) => (
            <Tag key={category} category={category} count={value} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const allPosts = getAllPosts();
  // Filter to posts that have the category
  const postsGroupedByCategory: Record<string, number> = {};
  allPosts.forEach((post) => {
    post.categories.forEach((category) => {
      if (postsGroupedByCategory[category] === undefined) {
        postsGroupedByCategory[category] = 1;
      } else {
        postsGroupedByCategory[category] += 1;
      }
    });
  });

  return {
    props: { postsGroupedByCategory },
  };
}

export default CategoriesIndexPage;
