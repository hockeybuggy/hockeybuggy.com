module.exports = {
  siteMetadata: {
    title: "hockeybuggy.com",
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
        plugins: [`gatsby-remark-prismjs`],
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
    // This code generation should be close to last
    "gatsby-plugin-graphql-codegen",
  ],
};
