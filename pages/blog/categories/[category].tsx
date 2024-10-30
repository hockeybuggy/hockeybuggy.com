import * as React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
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

const CategoryPage = ({ posts, category }: Props): React.ReactElement => {
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
export const getStaticProps = (async (context) => {
  const { params } = context;
  const category = (params!.category || "") as string;
  const allPostsMatchingCategory = getAllPosts().filter((post) => {
    return post.categories.includes(category);
  });

  return {
    props: {
      category,
      posts: allPostsMatchingCategory,
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
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
}) satisfies GetStaticPaths;

export default CategoryPage;
