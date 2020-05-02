import React from "react";
import { graphql } from "gatsby";

import { BaseLayout } from "../layouts";
import SEO from "../components/seo";

import { BlogPostBySlugQuery } from "../../graphql-types";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.postBySlug;

  return (
    <BaseLayout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
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
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default BlogPostTemplate;
