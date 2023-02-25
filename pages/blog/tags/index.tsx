import React from "react";
import { GetStaticPropsResult } from "next";
import Link from "next/link";

import { BlogLayout } from "../../../layouts";
import SEO from "../../../components/seo";

import { getAllPosts, getTagCountsFromPosts } from "../../../services/blog";
import { BlogPresentor } from "../../../services/presentors/blog";

interface TagsIndexPageProps {
  tagCounts: Record<string, number>;
}

const Tag = ({ tag, count }: { tag: string; count: number }): JSX.Element => {
  return (
    <li key={tag}>
      <Link href={BlogPresentor.getUrlForCategoryPage(tag)}>
        {tag} ({count})
      </Link>
    </li>
  );
};

const TagsIndexPage = ({ tagCounts }: TagsIndexPageProps): JSX.Element => {
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

export async function getStaticProps(): Promise<
  GetStaticPropsResult<TagsIndexPageProps>
> {
  const allPosts = getAllPosts();
  // Filter to posts that have the tags
  const tagCounts = getTagCountsFromPosts(allPosts);

  return {
    props: { tagCounts },
  };
}

export default TagsIndexPage;
