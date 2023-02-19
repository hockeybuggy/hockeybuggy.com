module.exports = {
  launch: {
    dumpio: false,
    headless: process.env.HEADLESS !== "false",
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : null,
  },
  browser: "chromium",
  browserContext: "default",
  server: {
    debug: true,
    command: "npm run start",
    launchTimeout: 25000,
    port: 4000,
    usedPortAction: "ignore",
  },
};
