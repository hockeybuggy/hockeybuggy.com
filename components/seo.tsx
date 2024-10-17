import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getBaseUrl } from "../services/url";

type MetaItem =
  | { name: string; content: any }
  | { property: string; content: any };

interface SEOProps {
  description?: string;
  meta?: Array<MetaItem>;
  title: string;
}

const SEO = ({ description, title }: SEOProps): React.ReactElement => {
  const metaDescription =
    description || "The personal website of Douglas Anderson";
  const router = useRouter();
  const canonicalUrl = `${getBaseUrl()}${router.asPath}`
    .replace(/index.html$/, "")
    .replace(/\/$/, "");

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
      <link rel="canonical" href={canonicalUrl} key="canonical" />

      <title>{title}</title>
    </Head>
  );
};

export default SEO;
