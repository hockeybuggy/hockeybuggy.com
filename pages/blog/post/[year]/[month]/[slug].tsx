import * as React from "react";
import { GetStaticPropsResult, GetStaticPathsResult } from "next";
import Link from "next/link";

import { BlogLayout } from "../../../../../layouts";
import SEO from "../../../../../components/seo";
import Icon from "../../../../../components/icon";

import { Post } from "../../../../../models/blog";
import { getPostBySlug, getAllPosts } from "../../../../../services/blog";
import { BlogPresentor } from "../../../../../services/presentors/blog";
import {
  markdownToHtml,
  markdownToHtmlExcerpt,
} from "../../../../../services/markdownToHtml";

/* intersperse: Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > _([1,2,3]).intersperse(0)
 * [1,0,2,0,3]
 *
 * Borrowed lightly fron: https://stackoverflow.com/a/23619085/1745922
 */
export function intersperse<X, Y>(arr: Array<X>, sep: Y): Array<X | Y> {
  const result: Array<X | Y> = [];
  if (arr.length === 0) {
    return result;
  }

  result.push(arr[0]);
  return arr.slice(1).reduce(function (xs, x) {
    return xs.concat([sep, x]);
  }, result);
}

interface Props {
  post: Post;
  html: string;
  excerpt: string;
}

const BlogPostPage = ({ post, html, excerpt }: Props): React.ReactElement => {
  const { title, isoDate, isoEditDate, categories, tags } = post;
  const humanDate = BlogPresentor.getHumanReadableDateOfPost(post);
  const humanEditDate = BlogPresentor.getHumanReadableEditDateOfPost(post);

  return (
    <BlogLayout className="post">
      <SEO title={title!} description={excerpt} />
      <article>
        <header>
          <h1 className="post-title">{title}</h1>
          <div className="post-meta">
            {humanEditDate ? (
              <>
                <div className="date">
                  <Icon name={Icon.Names.Calendar} label="Publication date" />
                  <time dateTime={isoDate} />
                  Publication date: {humanDate}
                </div>
                <div className="date">
                  <Icon name={Icon.Names.Calendar} label="Edit date" />
                  <time dateTime={isoEditDate} />
                  Edit date: {humanEditDate}
                </div>
              </>
            ) : (
              <div className="date">
                <Icon name={Icon.Names.Calendar} label="Publication date" />
                <time dateTime={isoDate} />
                {humanDate}
              </div>
            )}

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
    </BlogLayout>
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
  console.log(`getStaticProps: blog post ${params.slug}`);
  const post = getPostBySlug(params.slug)!;
  const html = await markdownToHtml(post.content);
  const excerpt = await markdownToHtmlExcerpt(post.content);

  return {
    props: {
      post: {
        ...post,
      },
      html,
      excerpt,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  console.log("getStaticPaths: blog posts");
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
