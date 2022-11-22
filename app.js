const express = require('express');
const fs = require('fs');
const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com/r/wallpapers/';

const app = express();

app.get('/', (req, res) => {
  console.log('The app is running ');
});

app.listen(3000);

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(url);
    let counter = 0;

    const bodyHandle = await page.$$('.ImageBox-image');
    bodyHandle.forEach(async (el) => {
      const src = await page.evaluate((img) => img.src, el);
      console.log(src);
      fs.writeFileSync(`images/image-${counter}`, src, 'utf-8');
      counter += 1;
    });
    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
