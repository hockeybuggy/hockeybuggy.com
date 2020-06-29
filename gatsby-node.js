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
  });

  [
    "/2020/05/switching-to-gatsby",
    "/2020/01/experimenting-with-protobufs-generated-types-in-rust",
    "/2019/09/migrated-to-hugo",
    "/2016/08/relative-line-numbers-and-you",
    "/2016/01/vim-splitting-shortcuts",
    "/2015/03/long-python-commands-down-to-size",
    "/2014/10/whats-the-deal-with-the-name-hockeybuggy",
    "/2014/09/state-of-the-dotfiles",
    "/2014/06/adding-semantics",
    "/2013/09/migrated-to-jekyll",
    "/2013/03/moving-beymond-word-wise-motions",
    "/2013/01/adding-sass-files",
    "/2012/12/taking-this-pelican-site-live",
  ].map((path) => {
    createRedirect({
      fromPath: `/blog/${path}`,
      toPath: `/blog/post/${path}`,
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
