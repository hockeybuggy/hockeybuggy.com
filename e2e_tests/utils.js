const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"];

/* This helper function takes a Puppetter `page` and a `url` and loads the
 * page, responding when all requests have completed.
 */
const loadPage = async (page, url) => {
  await page.emulate(iPhone);
  const response = await page.goto(url, {
    waitUntil: "networkidle2",
  });
  expect(response.ok());
  expect(page.url()).toEqual(url);
};

module.exports = {
  loadPage,
};
