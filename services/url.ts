const BASE_URL = process.env.URL;

export function getBaseUrl() {
  return BASE_URL || "https://hockeybuggy.com";
}
