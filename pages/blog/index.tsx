import * as React from "react";
import { GetStaticPropsResult } from "next";
import Link from "next/link";

import { BlogLayout } from "../../layouts";
import SEO from "../../components/seo";

import { Post } from "../../models/blog";
import { getAllPosts } from "../../services/blog";
import { BlogPresentor } from "../../services/presentors/blog";

interface Props {
  allPosts: Post[];
}

const BlogIndex = ({ allPosts }: Props): React.ReactElement => {
  return (
    <BlogLayout pathname={"/blog/"}>
      <SEO title={"Blog"} />

      <h1>Blog Posts</h1>
      {allPosts.map((post: Post) => {
        const slug = post.slug;
        const date = BlogPresentor.getHumanReadableDateOfPost(post);
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
                <Link href={BlogPresentor.getUrlForPost(post)}>{title}</Link>
              </h2>
            </header>
            <hr />
          </article>
        );
      })}
    </BlogLayout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  console.log("getStaticProps: blog index");
  const allPosts = getAllPosts();
  const allListedPosts = allPosts.filter((post) => !post.delisted);

  return {
    props: { allPosts: allListedPosts },
  };
}

export default BlogIndex;
