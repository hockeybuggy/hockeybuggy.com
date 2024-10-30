import { KnownDevices } from "puppeteer";

/* This helper function takes a Puppetter `page` and a `url` and loads the
 * page, responding when all requests have completed.
 */
const loadPage = async (
  page: any,
  url: string,
  device?: "iPhone 6" | "iPad Pro",
) => {
  await page.emulate(KnownDevices[device || "iPhone 6"]);
  const response = await page.goto(url, {
    waitUntil: "networkidle2",
  });
  expect(response.ok()).not.toBe(null);
  expect(page.url()).toEqual(url);
};

export { loadPage };
