import puppeteer from "puppeteer";

/**
 * WebScalper class used to perform entire
 * scalping process.
 *
 * Available functions can be used from anywhere in the code
 * just by including this class.
 */
class WebScalper {
  /**
   *
   * @param {URL} url - is to get correct site where puppeteer will perform scalping.
   * @param {Array} commands - is to pass array of commands and perform.
   * @returns {String} - is to return path to the screenshot of the site after scalping.
   */
  async getVisual(url, commands) {
    try {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });

      if (commands) {
        for await (const command of commands) {
          if (command.type === "type") {
            const element = command.element;
            const value = command.value;
            await page.type(element, value);
          }

          if (command.type === "click") {
            const element = command.element;
            await page.click(element);
          }

          if (command.type === "waitForNavigation") {
            await page.waitForNavigation();
          }

          if (command.type === "waitForSelector") {
            const element = command.element;
            await page.waitForSelector(element);
          }
        }
      }

      const path = `./public/webscalper/${Date.now()}.png`;
      await page.screenshot({ path: path, fullPage: false });

      await browser.close();

      return process.env.SITE_URI + path.substring(8);
    } catch (error) {
      // TODO: Add better error handling.
      // Possible solution: https://www.npmjs.com/package/winston
      console.error(error);
    }
  }
}

export default WebScalper;
