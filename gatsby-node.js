const path = require(`path`);
const _ = require(`lodash`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const blogPostTemplate = path.resolve(`./src/templates/blogPost.tsx`);
  const tagTemplate = path.resolve("src/templates/tags.tsx");

  const result = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                slug
                year: date(formatString: "YYYY")
                month: date(formatString: "MM")
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.postsRemark.edges;
  posts.forEach((post) => {
    const { year, month, slug } = post.node.frontmatter;
    createPage({
      path: `/blog/post/${year}/${month}/${slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
      },
    });

    createRedirect({
      fromPath: `/blog/${year}/${month}/${slug}`,
      toPath: `/blog/post/${year}/${month}/${slug}`,
      isPermanent: true,
    });
  });

  // Create pages for tags
  const tags = result.data.tagsGroup.group;
  tags.forEach((tag) => {
    createPage({
      path: `/blog/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
