const path = require(`path`);
const _ = require(`lodash`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`./src/templates/blogPost.tsx`);
  const tagTemplate = path.resolve("src/templates/tags.tsx");
  const categoryTemplate = path.resolve("src/templates/categories.tsx");
  const projectTemplate = path.resolve(`./src/templates/project.tsx`);

  const result = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/content/blog/*" } }
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

        tagsGroup: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/content/blog/*" } }
          limit: 2000
        ) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }

        categoriesGroup: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/content/blog/*" } }
          limit: 2000
        ) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }

        projectsRemark: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/content/projects/*" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                slug
              }
            }
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
  posts.forEach(post => {
    const { year, month, slug } = post.node.frontmatter;
    createPage({
      path: `/blog/post/${year}/${month}/${slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug
      }
    });
  });

  // Create pages for tags
  const tags = result.data.tagsGroup.group;
  tags.forEach(tag => {
    createPage({
      path: `/blog/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue
      }
    });
  });

  // Create pages for categories
  const categories = result.data.categoriesGroup.group;
  categories.forEach(category => {
    createPage({
      path: `/blog/categories/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue
      }
    });
  });

  // Create project pages
  const projects = result.data.projectsRemark.edges;
  projects.forEach(project => {
    const { slug } = project.node.frontmatter;
    createPage({
      path: `/project/${slug}`,
      component: projectTemplate,
      context: {
        slug: project.node.fields.slug,
        imagesSlug: `projects/${slug}`
      }
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
      value
    });
  }
};
