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
    command: "npm run dev",
    launchTimeout: 45000,
    port: 3000,
    usedPortAction: "ignore",
  },
};
