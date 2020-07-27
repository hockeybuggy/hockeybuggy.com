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
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 860,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `${__dirname}/content/projects/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/images/`,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(({ node }) => {
                const slug = node.frontmatter.slug;
                const year = node.frontmatter.year;
                const month = node.frontmatter.month;
                const postUrl =
                  site.siteMetadata.siteUrl +
                  `/blog/post/${year}/${month}/${slug}`;
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: postUrl,
                  guid: postUrl,
                  custom_elements: [{ "content:encoded": node.html }],
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
                      frontmatter {
                        date
                        month: date(formatString: "MM")
                        slug
                        title
                        year: date(formatString: "YYYY")
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-11131562-1",
        anonymize: true,
        respectDNT: true,
      },
    },
    // This code generation should be close to last
    "gatsby-plugin-graphql-codegen",
  ],
};
