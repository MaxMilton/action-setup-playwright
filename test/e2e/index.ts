/* eslint-disable import/no-extraneous-dependencies, no-console */

// TODO: Set up for testing multiple browsers and expecting fail when action
// "browsers" input is a single browser

// import { chromium, webkit, firefox } from 'playwright';
import http from 'http';
import { BrowserType, chromium } from 'playwright';

const server = http.createServer((_req, res) => {
  res.writeHead(200);
  res.end('Hello, world');
});

const headless = !process.env.HEADFUL;

async function checkBrowser(browserType: BrowserType): Promise<boolean> {
  try {
    console.log(`Running ${browserType.name()}`);

    const browser = await browserType.launch({ headless });
    const page = await browser.newPage();
    await page.goto('http://localhost:8080');

    console.log(
      `- ${browserType.name()}:`,
      await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        clientHeight: document.documentElement.clientHeight,
      })),
    );

    await browser.close();

    console.log(`SUCCESS running ${browserType.name()}`);

    return true;
  } catch (err) {
    console.log(`FAILED running ${browserType.name()}`);
    console.error(err);

    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
server.listen(8080, async () => {
  let success = true;

  success = (await checkBrowser(chromium)) && success;
  // success = (await checkBrowser(firefox)) && success;
  // success = (await checkBrowser(webkit)) && success;

  server.close();

  // in case some browsers failed to close - exit process.
  process.exit(success ? 0 : 1);
});
