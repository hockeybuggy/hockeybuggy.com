import React from "react";
import { GetStaticPropsResult } from "next";
import Link from "next/link";

import { BlogLayout } from "../../../layouts";
import SEO from "../../../components/seo";

import {
  getAllPosts,
  getCategoryCountsFromPosts,
} from "../../../services/blog";
import { BlogPresentor } from "../../../services/presentors/blog";

interface CategoriesIndexPageProps {
  categoryCounts: Record<string, number>;
}

const Category = ({
  category,
  count,
}: {
  category: string;
  count: number;
}): JSX.Element => {
  return (
    <li key={category}>
      <Link href={BlogPresentor.getUrlForCategoryPage(category)}>
        {category} ({count})
      </Link>
    </li>
  );
};

const CategoriesIndexPage = ({
  categoryCounts,
}: CategoriesIndexPageProps): JSX.Element => {
  return (
    <BlogLayout>
      <SEO title={"Categories"} />
      <div>
        <h1>Categories</h1>
        <ul>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <Category key={category} category={category} count={count} />
          ))}
        </ul>
      </div>
    </BlogLayout>
  );
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<CategoriesIndexPageProps>
> {
  const allPosts = getAllPosts();
  const categoryCounts = getCategoryCountsFromPosts(allPosts);

  return {
    props: { categoryCounts },
  };
}

export default CategoriesIndexPage;
