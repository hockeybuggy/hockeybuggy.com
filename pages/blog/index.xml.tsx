import * as React from "react";
import { ServerResponse } from "http";
import { GetServerSidePropsResult } from "next";

import { getAllPosts } from "../../services/blog";
import { BlogPresentor } from "../../services/presentors/blog";
import { Feed } from "feed";
import {
  markdownToHtml,
  markdownToHtmlExcerpt,
} from "../../services/markdownToHtml";

const Sitemap: React.FC = () => null;

export async function getServerSideProps({
  res,
}: {
  res: ServerResponse;
}): Promise<GetServerSidePropsResult<Record<string, never>>> {
  const feed = new Feed({
    title: "Hockeybuggy.com",
    description: "The personal website of Douglas Anderson",
    id: "http://hockeybuggy.com/blog",
    link: "http://hockeybuggy.com/blog",
    language: "en",
    image: "http://hockeybuggy.com/image.png",
    favicon: "http://hockeybuggy.com/favicon.ico",
    copyright: "Creative commons 2021, Douglas Anderson",
    generator: "Feed with Next.js",
    feedLinks: {
      atom: "https://example.com/blog/index.xml",
    },
    author: {
      name: "Douglas Anderson",
      email: "hockeybuggy@gmail.com",
      link: "https://hockeybuggy.com/",
    },
  });

  const posts = getAllPosts();

  await Promise.all(
    posts.map(async (post) => {
      const postUrl = `https://hockeybuggy.com/${BlogPresentor.getUrlForPost(
        post
      )}`;
      const html = await markdownToHtml(post.content);
      const excerpt = await markdownToHtmlExcerpt(post.content);

      feed.addItem({
        title: post.title,
        id: postUrl,
        link: postUrl,
        description: excerpt,
        content: html,
        author: [
          {
            name: "Douglas Anderson",
            email: "hockeybuggy@gmail.com",
            link: "https://hockeybuggy.com/",
          },
        ],
        date: BlogPresentor.getDateOfPost(post),
      });
    })
  );

  if (res) {
    res.setHeader("Content-Type", "text/xml");
    res.write(feed.atom1());
    res.end();
  }

  return { props: {} };
}

export default Sitemap;
