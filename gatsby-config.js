module.exports = {
  siteMetadata: {
    title: "hockeybuggy.com",
    description: "The personal website of Douglas Anderson",
    byline: "I curl, canoe, and compute.",
    author: {
      fullName: "Douglas Anderson",
      preferredName: "Doug or Douglas",
      preferredPronouns: "He/Him",
    },
    social: {
      github: `hockeybuggy`,
      twitter: `hockeybuggy`,
      email: `hockeybuggy@gmail.com`,
    },
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog/`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images/`,
    //   },
    // },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    // This code generation should be close to last
    "gatsby-plugin-graphql-codegen",
  ],
};
