import * as React from "react";

import { PageProps, graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

import { CenteredLayout } from "../layouts";
import SEO from "../components/seo";
import Icon from "../components/icon";

import { IndexPageQuery } from "../../graphql-types";

const byline = "I curl, canoe, and compute.";
const social = [
  {
    label: "GitHub",
    link: "https://github.com/hockeybuggy",
    iconName: Icon.Names.GitHub,
  },
  {
    label: "Twitter",
    link: "https://twitter.com/hockeybuggy",
    iconName: Icon.Names.Twitter,
  },
  {
    label: "Email",
    link: "mailto:://hockeybuggy@gmail.com",
    iconName: Icon.Names.Email,
  },
];

const IndexPage = ({ data }: PageProps<IndexPageQuery>): JSX.Element => {
  const author = data.site!.siteMetadata!.author!;
  const description = data.site!.siteMetadata!.description!;

  return (
    <CenteredLayout pathname={"/"}>
      <SEO title={description} />
      <div className="about">
        <div className="avatar">
          <Img fluid={data.avatarImage!.fluid! as FluidObject} />
        </div>
        <h1>{author.fullName!}</h1>
        <h2>{byline}</h2>
        <ul>
          {social.map((socialSite) => {
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
    avatarImage: imageSharp(
      fluid: { originalName: { eq: "douglas-paddling.jpg" } }
    ) {
      id
      fluid(maxWidth: 860) {
        aspectRatio
        base64
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
      }
    }
  }
`;

export default IndexPage;
