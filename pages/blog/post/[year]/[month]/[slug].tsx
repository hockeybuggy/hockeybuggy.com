import * as React from "react";
import { GetStaticPropsResult, GetStaticPathsResult } from "next";
import Link from "next/link";

import { BaseLayout } from "../../../../../layouts";
import SEO from "../../../../../components/seo";
import Icon from "../../../../../components/icon";

import { intersperse } from "../../../../../services/utils";
import {
  Post,
  getPostBySlug,
  getAllPosts,
  BlogPresentor,
} from "../../../../../services/blog";

interface Props {
  post: Post;
  html: string;
}

const BlogPostPage = ({ post, html }: Props): JSX.Element => {
  const { title, isoDate, categories, tags } = post;
  const excerpt = ""; // TODO get an exceprt
  const humanDate = BlogPresentor.getHumanReadableDateOfPost(post);

  return (
    <BaseLayout className="post">
      <SEO title={title!} description={excerpt} />
      <article>
        <header>
          <h1 className="post-title">{title}</h1>
          <div className="post-meta">
            <div className="date">
              <span className="posted-on">
                <Icon name={Icon.Names.Calendar} label="Publication date" />
                <time dateTime={isoDate} />
                {humanDate}
              </span>
            </div>

            <div className="categories">
              <Icon name={Icon.Names.Folder} label="Post categories" />
              {intersperse(
                (categories || []).map((tag) => (
                  <span key={tag!}>
                    <Link href={`/blog/categories/${tag}`}>{tag}</Link>
                  </span>
                )),
                ", "
              )}
            </div>

            <div className="tags">
              <Icon name={Icon.Names.Tag} label="Post tags" />
              {intersperse(
                (tags || []).map((tag) => (
                  <span key={tag!}>
                    <Link href={`/blog/tags/${tag}`}>{tag}</Link>
                  </span>
                )),
                ", "
              )}
            </div>
          </div>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
      </article>
    </BaseLayout>
  );
};

type Params = {
  params: {
    year: string;
    month: string;
    slug: string;
  };
};

export async function getStaticProps({
  params,
}: Params): Promise<GetStaticPropsResult<Props>> {
  const post = getPostBySlug(params.slug)!;
  const html = await BlogPresentor.getHtmlOfPost(post);

  return {
    props: {
      post: {
        ...post,
      },
      html,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = getAllPosts();
  const paths = posts.map((post) => {
    return {
      params: {
        year: post.year,
        month: post.month,
        slug: post.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default BlogPostPage;
