import React from "react";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";

import { BaseLayout } from "../../../layouts";
import { getAllPosts } from "../../../services/blog";
import SEO from "../../../components/seo";

interface Props {
  postsGroupedByTag: Record<string, number>;
}

const Tag = ({ tags, count }: { tags: string; count: number }): JSX.Element => {
  return (
    <li key={tags}>
      <Link href={`/blog/tags/${kebabCase(tags)}/`}>
        <a>
          {tags} ({count})
        </a>
      </Link>
    </li>
  );
};

const TagsIndexPage = ({ postsGroupedByTag }: Props): JSX.Element => {
  return (
    <BaseLayout>
      <SEO title={"Tags"} />
      <div>
        <h1>Tags</h1>
        <ul>
          {Object.entries(postsGroupedByTag).map(([tags, value]) => (
            <Tag key={tags} tags={tags} count={value} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const allPosts = getAllPosts();
  // Filter to posts that have the tags
  const postsGroupedByTag: Record<string, number> = {};
  allPosts.forEach((post) => {
    post.tags.forEach((tags) => {
      if (postsGroupedByTag[tags] === undefined) {
        postsGroupedByTag[tags] = 1;
      } else {
        postsGroupedByTag[tags] += 1;
      }
    });
  });

  return {
    props: { postsGroupedByTag },
  };
}

export default TagsIndexPage;