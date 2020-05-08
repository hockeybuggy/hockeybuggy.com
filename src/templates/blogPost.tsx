import React from "react";
import { graphql } from "gatsby";

import { BaseLayout } from "../layouts";
import SEO from "../components/seo";

import { BlogPostBySlugQuery } from "../../graphql-types";

const BlogPostTemplate = ({ data }: { data: BlogPostBySlugQuery }) => {
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
                <i className="fas fa-calendar"></i>
                <time dateTime={computerDate} />

                {humanDate}
              </span>
            </div>

            <div className="categories">
              <i className="fas fa-folder"></i>
              {(categories || []).join(", ")}
            </div>

            <div className="tags">
              <i className="fas fa-tag"></i>
              {(tags || []).join(", ")}
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
