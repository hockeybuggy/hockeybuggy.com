import * as React from "react";

import { PageProps, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import { CenteredLayout } from "../layouts";
import SEO from "../components/seo";
import Icon from "../components/icon";

import { IndexPageQuery } from "../../graphql-types";

const byline = "I curl, canoe, and compute.";
const social = [
  {
    label: "GitHub",
    link: "https://github.com/hockeybuggy",
    iconName: Icon.Names.GitHub
  },
  {
    label: "Twitter",
    link: "https://twitter.com/hockeybuggy",
    iconName: Icon.Names.Twitter
  },
  {
    label: "Email",
    link: "mailto:://hockeybuggy@gmail.com",
    iconName: Icon.Names.Email
  }
];

const IndexPage = ({ data }: PageProps<IndexPageQuery>): JSX.Element => {
  const author = data.site!.siteMetadata!.author!;
  const description = data.site!.siteMetadata!.description!;
  const avatarImage = data.avatarImage!.childrenImageSharp![0]!.gatsbyImageData;

  return (
    <CenteredLayout pathname={"/"}>
      <SEO title={description} />
      <div className="about">
        <div className="avatar">
          <GatsbyImage
            alt="An image of the author (Douglas Anderson) paddling a canoe."
            image={avatarImage}
          />
        </div>
        <h1>{author.fullName!}</h1>
        <h2>{byline}</h2>
        <ul>
          {social.map(socialSite => {
            return (
              <li key={socialSite.label}>
                <a aria-label={socialSite.label} href={socialSite.link}>
                  <Icon
                    name={socialSite.iconName}
                    size={Icon.Sizes.Large}
                    aria-hidden="true"
                    label=""
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </CenteredLayout>
  );
};

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        description
        author {
          fullName
        }
      }
    }
    avatarImage: file(relativePath: { eq: "douglas-paddling.jpg" }) {
      childrenImageSharp {
        gatsbyImageData(width: 180)
      }
    }
  }
`;

export default IndexPage;
