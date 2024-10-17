import * as React from "react";
import { GetStaticPropsResult, GetStaticPathsResult } from "next";
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
type Params = {
  params: {
    tag: string;
  };
};

export async function getStaticProps({
  params,
}: Params): Promise<GetStaticPropsResult<Props>> {
  const allPostsMatchingTag = getAllPosts().filter((post) => {
    return post.tags.includes(params.tag);
  });

  return {
    props: {
      tag: params.tag,
      posts: allPostsMatchingTag,
    },
  };
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
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
}

export default TagPage;
