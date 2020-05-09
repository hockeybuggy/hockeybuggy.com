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

module.exports = {
  LANDING_PAGE,
  BLOG_PAGE,
};
