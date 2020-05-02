module.exports = {
  siteMetadata: {
    title: "The personal website of Douglas Anderson",
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    // This code generation should be close to last
    "gatsby-plugin-graphql-codegen",
    "gatsby-plugin-sass",
  ],
};
