import config from '../config/index.js';
import puppeteer from 'puppeteer';

async function launchBrowser() {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
      ],
      executablePath:
        config.node_env === 'production'
          ? config.puppeteer.executablePath
          : puppeteer.executablePath(),
      headless: config.node_env === 'development' ? false : 'new',
    });

    return browser;
  } catch (error) {
    console.log(error);
    console.log('Browser launch failed.');
    return null;
  }
}

export default launchBrowser;
