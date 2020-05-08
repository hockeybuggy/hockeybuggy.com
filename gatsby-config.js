module.exports = {
  siteMetadata: {
    title: "hockeybuggy.com",
    siteUrl: "https://hockeybuggy.com",
    description: "The personal website of Douglas Anderson",
    author: {
      fullName: "Douglas Anderson",
      preferredName: "Doug or Douglas",
      preferredPronouns: "He/Him",
    },
  },
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`, `gatsby-remark-prismjs`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog/`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/blog/index.xml",
            title: "Recent blog posts on hockeybuggy.com",
          },
        ],
      },
    },
    // This code generation should be close to last
    "gatsby-plugin-graphql-codegen",
  ],
};
