import React from "react";
import { Helmet } from "react-helmet";

type MetaItem =
  | { name: string; content: any }
  | { property: string; content: any };

interface SEOProps {
  description?: string;
  meta?: Array<MetaItem>;
  title: string;
}

const SEO = ({ description, meta = [], title }: SEOProps): JSX.Element => {
  const site: any = {}; // TODO this is not correct

  const metaDescription =
    description || "The personal website of Douglas Anderson";

  return (
    <Helmet
      htmlAttributes={{
        lang: "en-ca",
      }}
      title={title}
      titleTemplate={`%s | hockeybuggy.com`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: `https://twitter.com/hockeybuggy`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
