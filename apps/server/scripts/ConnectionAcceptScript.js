import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

const browser = await puppeteer.launch({
  headless: true,
  ignoreHTTPSErrors: true,
  executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

export const page = await browser.newPage();

export const connectionScript = async () => {
  const cookies = [
    {
      name: "li_at",
      value: process.env.LINKED_IN_COOKIE,
      domain: ".linkedin.com",
    },
  ];
  page.setDefaultTimeout(1200000);
  await page.setCookie(...cookies);
  await page.goto("https://linkedin.com/");

  try {
    await page.waitForSelector('span[title="My Network"]');
    await page.click('span[title="My Network"]');

    await page.waitForTimeout(2000);
    await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll('span'));
      const targetSpan = spans.find(span => span.innerText.includes('You are on the messaging overlay. Press enter to minimize it'));
      if (targetSpan) {
          targetSpan.click();
      }
  });

    let count = 1;
    let interval = 2000;
    setInterval(async () => {
      if (interval == 20000) {
        count = 1;
        interval = 2000;
      }
      if (count > 5) {
        interval = 20000;
      }
      await page.waitForSelector(
        '[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view invitation-card__action-btn"]'
      );
      const buttons = await page.$$(
        '[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view invitation-card__action-btn"]'
      );

      console.log("buttons", buttons);
      await buttons[buttons.length - 1].click();
      count++;
    }, interval);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
