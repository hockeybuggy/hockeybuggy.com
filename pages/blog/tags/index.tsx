import React from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";

import { BlogLayout } from "../../../layouts";
import SEO from "../../../components/seo";

import { getAllPosts, getTagCountsFromPosts } from "../../../services/blog";
import { BlogPresentor } from "../../../services/presentors/blog";

interface TagsIndexPageProps {
  tagCounts: Record<string, number>;
}

const Tag = ({
  tag,
  count,
}: {
  tag: string;
  count: number;
}): React.ReactElement => {
  return (
    <li key={tag}>
      <Link href={BlogPresentor.getUrlForTagPage(tag)}>
        {tag} ({count})
      </Link>
    </li>
  );
};

const TagsIndexPage = ({
  tagCounts,
}: TagsIndexPageProps): React.ReactElement => {
  return (
    <BlogLayout>
      <SEO title={"Tags"} />
      <div>
        <h1>Tags</h1>
        <ul>
          {Object.entries(tagCounts)
            .sort((a, b) => {
              return a[0].localeCompare(b[0]);
            })
            .map(([tag, value]) => (
              <Tag key={tag} tag={tag} count={value} />
            ))}
        </ul>
      </div>
    </BlogLayout>
  );
};

export const getStaticProps = (async () => {
  const allPosts = getAllPosts();
  // Filter to posts that have the tags
  const tagCounts = getTagCountsFromPosts(allPosts);

  return {
    props: { tagCounts },
  };
}) satisfies GetStaticProps;

export default TagsIndexPage;
