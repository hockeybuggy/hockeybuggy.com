import React from "react";
import { Link, PageProps, graphql } from "gatsby";

import { BaseLayout } from "../layouts";
import SEO from "../components/seo";
import Icon from "../components/icon";

import { BlogPostBySlugQuery } from "../../graphql-types";

/* intersperse: Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > _([1,2,3]).intersperse(0)
 * [1,0,2,0,3]
 *
 * Borrowed lightly fron: https://stackoverflow.com/a/23619085/1745922
 */
function intersperse<X, Y>(arr: Array<X>, sep: Y): Array<X | Y> {
  const result: Array<X | Y> = [];
  if (arr.length === 0) {
    return result;
  }

  result.push(arr[0]);
  return arr.slice(1).reduce(function (xs, x, i) {
    return xs.concat([sep, x]);
  }, result);
}

const BlogPostTemplate = ({
  data,
}: PageProps<BlogPostBySlugQuery>): JSX.Element => {
  const {
    title,
    humanDate,
    computerDate,
    categories,
    tags,
  } = data.postBySlug!.frontmatter!;
  const excerpt = data.postBySlug!.excerpt!;
  const html = data.postBySlug!.html!;

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
                <time dateTime={computerDate} />
                {humanDate}
              </span>
            </div>

            <div className="categories">
              <Icon name={Icon.Names.Folder} label="Post categories" />
              {(categories || []).join(", ")}
            </div>

            <div className="tags">
              <Icon name={Icon.Names.Tag} label="Post tags" />
              {intersperse(
                (tags || []).map((tag) => (
                  <Link to={`/tags/${tag}`}>{tag}</Link>
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

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        humanDate: date(formatString: "MMMM DD, YYYY")
        computerDate: date
        categories
        tags
      }
    }
  }
`;

export default BlogPostTemplate;
