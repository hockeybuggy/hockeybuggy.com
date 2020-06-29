const BASE_URL = "http://localhost:8000";

const LANDING_PAGE = {
  url: `${BASE_URL}/`,
  expected: {
    title: "The personal website of Douglas Anderson | hockeybuggy.com",
  },
};

const BLOG_PAGE = {
  url: `${BASE_URL}/blog/`,
  expected: {
    title: "Blog | hockeybuggy.com",
  },
};

const TAGS_PAGE = {
  url: `${BASE_URL}/blog/tags/`,
  expected: {
    title: "Tags | hockeybuggy.com",
  },
};

module.exports = {
  BASE_URL,
  LANDING_PAGE,
  BLOG_PAGE,
  TAGS_PAGE,
};
