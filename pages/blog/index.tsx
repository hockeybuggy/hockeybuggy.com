import * as React from "react";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import { parseISO, format } from "date-fns";

import { BaseLayout } from "../../layouts";
import SEO from "../../components/seo";

import { Post, getAllPosts } from "../../services/blog";

interface Props {
  allPosts: Post[];
}

const BlogIndex = ({ allPosts }: Props): JSX.Element => {
  return (
    <BaseLayout pathname={"/blog/"}>
      <SEO title={"Blog"} />

      <h1>Blog Posts</h1>
      {allPosts.map((post: Post) => {
        const slug = post.slug;
        const date = format(parseISO(post.isoDate), "yyyy-MM-dd");
        const year = post.year;
        const month = post.month;
        const day = post.day;
        const title = post.title || slug;
        return (
          <article key={slug}>
            <header>
              <small>
                <time dateTime={`${year}-${month}-${day}`}>{date}</time>
              </small>
              <h2 style={{ margin: 0, marginBottom: "1.8rem" }}>
                <Link href={`/blog/post/${year}/${month}/${slug}`}>
                  {title}
                </Link>
              </h2>
            </header>
            <hr />
          </article>
        );
      })}
    </BaseLayout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}

export default BlogIndex;
