import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);
describe('Popover button', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork('../ahj-homework-5/src/js/e2e.server.js');
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
    //  headless: false,
    //  slowMo: 100,
    //  devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should show a popup', async () => {
    await Promise.all([
      page.goto(baseUrl),
      page.waitForNavigation(),
    ]);
    const body = await page.$('[id=body]');
    const button = await body.$('[id=button1]');
    await button.click();
    await page.waitForSelector('[id=popover1]');
  });
});
