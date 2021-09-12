import * as React from "react";
import { ServerResponse } from "http";
import { GetServerSideProps } from "next";
import { getAllPosts, BlogPresentor } from "../../services/blog";
import { Feed } from "feed";

const Sitemap: React.FC = () => null;

export async function getServerSideProps({
  res,
}: {
  res: ServerResponse;
}): Promise<GetServerSideProps> {
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
      const html = await BlogPresentor.getHtmlOfPost(post);

      feed.addItem({
        title: post.title,
        id: postUrl,
        link: postUrl,
        // description: post.excerpt, // TODO
        description: "",
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
