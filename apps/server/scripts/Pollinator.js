import puppeteer from "puppeteer-extra";
import Pollinator from "pollinator";
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import { getAnswerFromGemini } from "../langChain/LangchainBot.js";
export const messagingScript = async () => {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  let value =
    "AQEDAULw9jgAoiQIAAABjKurG5IAAAGNwFj0T1YAlpQKSCLiSRavhzYXWgmRw5jUceZdHRWLNPpf9vf9k5eG0I0BVTZ9C7RQNDqOhkvIlZ-uheeMeiLbG1B_w1bhTUlcaDneKfDIpNAO_3xEuh2qP4RF";
  const page = await browser.newPage();

  page.setDefaultTimeout(600000);

  const cookies = [
    {
      name: "li_at",
      value,
      domain: ".linkedin.com",
    },
  ];

  await page.setCookie(...cookies);
  await page.goto("https://linkedin.com/");

  try {
    await page.waitForSelector('span[title="Messaging"]');
    await page.click('span[title="Messaging"]');

    await page.waitForSelector(".msg-conversation-card__unread-count");

    const pollinator = new Pollinator(async () => {
      const unreadChats = await page.$$(".msg-conversation-card__unread-count");

      for (const chat of unreadChats) {
        await page.waitForTimeout(1000);

        await page.evaluate((el) => el.click(), chat);

        await page.waitForSelector("p.msg-s-event-listitem__body");

        const messages = await page.$$eval(
          "p.msg-s-event-listitem__body",
          (nodes) => nodes.map((n) => n.innerText)
        );
        const textMessage = messages[messages.length - 1];

        await page.waitForTimeout(2000);

        let response;
        try {
          if (textMessage !== undefined)
            response = await getAnswerFromGemini(textMessage);
        } catch (error) {
          console.log(error);
          response = "Error occurred while processing the message.";
        }

        await page.waitForSelector('div[role="textbox"]');
        await page.type('div[role="textbox"]', response, { delay: 30 });

        await page.waitForTimeout(1000);

        await page.waitForSelector(".msg-form__send-button");
        const btn = await page.$(".msg-form__send-button");
        await btn.focus();
        await btn.click();
      }
    });
    pollinator.start({ interval: 10000 });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
messagingScript();
