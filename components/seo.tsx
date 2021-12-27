import React from "react";
import Head from "next/head";

type MetaItem =
  | { name: string; content: any }
  | { property: string; content: any };

interface SEOProps {
  description?: string;
  meta?: Array<MetaItem>;
  title: string;
}

const SEO = ({ description, title }: SEOProps): JSX.Element => {
  const metaDescription =
    description || "The personal website of Douglas Anderson";

  return (
    <Head>
      <meta name={`description`} content={metaDescription} />
      <meta property={`og:title`} content={title} />
      <meta property={`og:description`} content={metaDescription} />
      <meta property={`og:type`} content={`website`} />
      <meta name={`twitter:card`} content={`summary`} />
      <meta
        name={`twitter:creator`}
        content={`https://twitter.com/hockeybuggy`}
      />
      <meta name={`twitter:title`} content={title} />
      <meta name={`twitter:description`} content={metaDescription} />
      <title>{title}</title>
    </Head>
  );
};

export default SEO;
