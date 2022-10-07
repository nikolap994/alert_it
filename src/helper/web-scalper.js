const puppeteer = require("puppeteer");

async function getVisual() {
  try {
    const URL = "https://google.com/";
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle2" });

    await page.screenshot({ path: "screenshot.png", fullPage: false });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

getVisual();
