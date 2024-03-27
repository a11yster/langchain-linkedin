import puppeteer from "puppeteer";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  let value = process.env.LINKED_IN_COOKIE;
  const page = await browser.newPage();
  page.setDefaultTimeout(600000);

  const cookies = [
    {
      name: "li_at",
      value,
      domain: ".linkedin.com",
    },
  ];
  const accountName = "";
  await page.setCookie(...cookies);
  await page.goto(`https://www.linkedin.com/in/${accountName}`);

  try {
    await page.waitForTimeout(1000);
    await page.waitForSelector(
      ".pv-text-details__about-this-profile-entrypoint"
    );

    const name = await page.$eval(
      ".pv-text-details__about-this-profile-entrypoint",
      (n) => n.innerText
    );

    await page.waitForTimeout(1000);
    const imageSrc = await page.$eval(
      "img.pv-top-card-profile-picture__image",
      (img) => img.src
    );

    await page.waitForTimeout(1000);

    await page.waitForSelector(
      'div[id="education"] ~ div.pvs-list__outer-container'
    );
    const hasEducationSeeAll =
      (await page.$('a[id="navigation-index-see-all-education"]')) !== null;
    const hasExperienceSeeAll =
      (await page.$('a[id="navigation-index-see-all-experience"]')) !== null;

    let education = "";
    let experience = "";

    // EXPERIENCE
    if (hasExperienceSeeAll) {
      await page.click('a[id="navigation-index-see-all-experience"]');
      await page.waitForSelector(
        'div.pvs-list__container span[aria-hidden="true"]'
      );
      experience = await page.$$eval(
        'div.pvs-list__container span[aria-hidden="true"]',
        (nodes) => nodes.map((n) => n.innerText)
      );
    } else {
      experience = await page.$$eval(
        'div[id="experience"] ~ div.pvs-list__outer-container span[aria-hidden="true"]',
        (nodes) => nodes.map((n) => n.innerText)
      );
    }

    //EDUCAATION
    if (hasEducationSeeAll) {
      await page.click('a[id="navigation-index-see-all-education"]');
      await page.waitForSelector(
        'div.pvs-list__container span[aria-hidden="true"]'
      );
      education = await page.$$eval(
        'div.pvs-list__container span[aria-hidden="true"]',
        (nodes) => nodes.map((n) => n.innerText)
      );
    } else {
      education = await page.$$eval(
        'div[id="education"] ~ div.pvs-list__outer-container span[aria-hidden="true"]',
        (nodes) => nodes.map((n) => n.innerText)
      );
    }

    const details = {
      name,
      imageSrc,
      experience,
      education,
    };
    const jsonData = JSON.stringify(details, null, 2);
    fs.writeFileSync("details.json", jsonData);
    console.log(details);
  } catch (e) {
    console.log("error:", e);
  }
})();
