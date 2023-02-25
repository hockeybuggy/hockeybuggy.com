import * as React from "react";
import { GetStaticPropsResult, GetStaticPathsResult } from "next";
import Link from "next/link";
import uniq from "lodash/uniq";

import { BlogLayout } from "../../../layouts";
import SEO from "../../../components/seo";

import { Post } from "../../../models/blog";
import { getAllPosts } from "../../../services/blog";
import { BlogPresentor } from "../../../services/presentors/blog";

interface Props {
  posts: Post[];
  category: string;
}

const CategoryPage = ({ posts, category }: Props): JSX.Element => {
  const totalCount = posts.length;
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } in the category "${category}"`;
  return (
    <BlogLayout>
      <SEO title={`Category: ${category}`} />
      <h1>{categoryHeader}</h1>
      <ul>
        {posts.map((post) => {
          const slug = post.slug;
          const title = post.title;
          return (
            <li key={slug}>
              <Link href={BlogPresentor.getUrlForPost(post)}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <Link href="/blog/categories">All categories</Link>
    </BlogLayout>
  );
};
type Params = {
  params: {
    category: string;
  };
};

export async function getStaticProps({
  params,
}: Params): Promise<GetStaticPropsResult<Props>> {
  const allPostsMatchingCategory = getAllPosts().filter((post) => {
    return post.categories.includes(params.category);
  });

  return {
    props: {
      category: params.category,
      posts: allPostsMatchingCategory,
    },
  };
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = getAllPosts();
  const allCategories = uniq(posts.map((post) => post.categories).flat());
  const paths = allCategories.map((category) => {
    return {
      params: { category },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default CategoryPage;
