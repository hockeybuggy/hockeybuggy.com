const LANDING_PAGE = {
  url: `/`,
  expected: {
    title: "The personal website of Douglas Anderson",
  },
};

const BLOG_PAGE = {
  url: `/blog`,
  expected: {
    title: "Blog",
  },
};

const TAGS_PAGE = {
  url: `/blog/tags`,
  expected: {
    title: "Tags",
  },
};

const CATEGORIES_PAGE = {
  url: `/blog/categories`,
  expected: {
    title: "Categories",
  },
};

const PROJECTS_PAGE = {
  url: `/projects`,
  expected: {
    title: "Projects",
  },
};

export {
  BLOG_PAGE,
  CATEGORIES_PAGE,
  LANDING_PAGE,
  PROJECTS_PAGE,
  TAGS_PAGE,
};
