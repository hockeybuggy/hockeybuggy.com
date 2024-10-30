import * as React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import uniq from "lodash/uniq";

import { BlogLayout } from "../../../layouts";
import SEO from "../../../components/seo";

import { Post } from "../../../models/blog";
import { getAllPosts } from "../../../services/blog";

interface Props {
  posts: Post[];
  tag: string;
}

const TagPage = ({ posts, tag }: Props): React.ReactElement => {
  const totalCount = posts.length;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } in with the tag "${tag}"`;
  return (
    <BlogLayout>
      <SEO title={`Tag: ${tag}`} />
      <h1>{tagHeader}</h1>
      <ul>
        {posts.map((post) => {
          const slug = post.slug;
          const year = post.year;
          const month = post.month;
          const title = post.title;
          return (
            <li key={slug}>
              <Link href={`/blog/post/${year}/${month}/${slug}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <Link href="/blog/tags">All tags</Link>
    </BlogLayout>
  );
};

export const getStaticProps = (async (context) => {
  const { params } = context;
  const tag = (params!.tag || "") as string;
  const allPostsMatchingTag = getAllPosts().filter((post) => {
    return post.tags.includes(tag);
  });

  return {
    props: {
      tag: tag,
      posts: allPostsMatchingTag,
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const posts = getAllPosts();
  const allTags = uniq(posts.map((post) => post.tags).flat());
  const paths = allTags.map((tag) => {
    return {
      params: { tag },
    };
  });

  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export default TagPage;
