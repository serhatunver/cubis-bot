import launchBrowser from './launchBrowser.js';
import loadCookies from './loadCookies.js';
import isLoggedIn from '../helpers/isLoggedIn.js';
import fetchContent from './fetchContent.js';
import compareContent from './compareContent.js';
import login from './login.js';
import isCookiesExist from '../helpers/isCookiesExist.js';

async function runProcess() {
  let browser = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    const cookiesExist = await isCookiesExist();
    if (cookiesExist) {
      await loadCookies(page);
      const loggedIn = await isLoggedIn(page);
      if (loggedIn) {
        // Cookies are valid,
        console.log('Cookies are valid.');
        const content = await fetchContent(page);
        await compareContent(content);
      } else {
        // Cookies are invalid,
        console.log('Cookies are invalid.');
        await login(page);
        const content = await fetchContent(page);
        await compareContent(content);
      }
    } else {
      // Cookies do not exist,
      console.log('Cookies do not exist.');
      await login(page);
      const content = await fetchContent(page);
      await compareContent(content);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}

export default runProcess;
