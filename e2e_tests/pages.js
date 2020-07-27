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

const CATEGORIES_PAGE = {
  url: `${BASE_URL}/blog/categories/`,
  expected: {
    title: "Categories | hockeybuggy.com",
  },
};

const PROJECTS_PAGE = {
  url: `${BASE_URL}/projects/`,
  expected: {
    title: "Projects | hockeybuggy.com",
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
