const BASE_URL = "http://localhost:4000";

const LANDING_PAGE = {
  url: `${BASE_URL}/`,
  expected: {
    title: "The personal website of Douglas Anderson",
  },
};

const BLOG_PAGE = {
  url: `${BASE_URL}/blog`,
  expected: {
    title: "Blog",
  },
};

const TAGS_PAGE = {
  url: `${BASE_URL}/blog/tags`,
  expected: {
    title: "Tags",
  },
};

const CATEGORIES_PAGE = {
  url: `${BASE_URL}/blog/categories`,
  expected: {
    title: "Categories",
  },
};

const PROJECTS_PAGE = {
  url: `${BASE_URL}/projects`,
  expected: {
    title: "Projects",
  },
};

module.exports = {
  BASE_URL,
  BLOG_PAGE,
  CATEGORIES_PAGE,
  LANDING_PAGE,
  PROJECTS_PAGE,
  TAGS_PAGE,
};
