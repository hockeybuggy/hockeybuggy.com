import * as React from "react";
import { PageProps, graphql } from "gatsby";

import { CenteredLayout } from "../layouts";

import { IndexPageQuery } from "../../graphql-types";

const byline = "I curl, canoe, and compute.";
const social = [
  {
    label: `GitHub`,
    link: `https://github.com/hockeybuggy`,
    fontAwesomeIcon: `fab fa-github fa-2x`,
  },
  {
    label: `Twitter`,
    link: `https://twitter.com/hockeybuggy`,
    fontAwesomeIcon: `fab fa-twitter fa-2x`,
  },
  {
    label: `Email`,
    link: `mailto:://hockeybuggy@gmail.com`,
    fontAwesomeIcon: `fas fa-at fa-2x`,
  },
];

const IndexPage = ({ data }: PageProps<IndexPageQuery>): JSX.Element => {
  const author = data.site!.siteMetadata!.author!;

  return (
    <CenteredLayout>
      <div className="about">
        <div className="avatar">Img here</div>
        <h1>{author.fullName!}</h1>
        <h2>{byline}</h2>
        <ul>
          {social.map((socialSite) => {
            return (
              <li key={socialSite.label}>
                <a aria-label={socialSite.label} href={socialSite.link}>
                  <i
                    className={socialSite.fontAwesomeIcon}
                    aria-hidden="true"
                  ></i>
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
        author {
          fullName
        }
      }
    }
  }
`;

export default IndexPage;
