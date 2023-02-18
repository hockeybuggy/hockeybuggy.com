import * as React from "react";
import Image from "next/image";

import { CenteredLayout } from "../layouts";
import SEO from "../components/seo";
import Icon from "../components/icon";

import douglasPaddling from "../content/images/douglas-paddling.webp";

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
    link: "mailto:hockeybuggy@gmail.com",
    iconName: Icon.Names.Email,
  },
];

const IndexPage = (): JSX.Element => {
  return (
    <CenteredLayout pathname={"/"}>
      <SEO title="The personal website of Douglas Anderson" />
      <div className="about">
        <div className="avatar">
          <Image
            src={douglasPaddling}
            alt="The website author wearing sunglasses a blue hat and shirt a red life jacket."
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <span className="placeholder" />
        </div>
        <h1>Douglas Anderson</h1>
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

export default IndexPage;
