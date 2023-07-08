import { writeFileSync, mkdirSync } from "fs";

import { getAllPosts } from "../services/blog";
import { BlogPresentor } from "../services/presentors/blog";
import { Feed } from "feed";
import {
  markdownToHtml,
  markdownToHtmlExcerpt,
} from "../services/markdownToHtml";

async function generate() {
  console.log("Generating RSS feed for blog...");

  const feed = new Feed({
    title: "Hockeybuggy.com",
    description: "The personal website of Douglas Anderson",
    id: "https://hockeybuggy.com/blog",
    link: "https://hockeybuggy.com/blog",
    language: "en",
    image: "https://hockeybuggy.com/image.png",
    favicon: "https://hockeybuggy.com/favicon.ico",
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
      const postUrl = `https://hockeybuggy.com${BlogPresentor.getUrlForPost(
        post,
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
    }),
  );

  const formatted = feed.atom1();

  mkdirSync("public/blog", { recursive: true });
  writeFileSync("public/blog/index.xml", formatted);

  console.log("Done.");
}

generate();
