import launchBrowser from './launchBrowser.js';
import fetchAndCompareContent from './fetchAndCompareContent.js';
import handleLogin from './handleLogin.js';
import isCookieExist from '../helpers/isCookieExist.js';
import isSessionValid from '../helpers/isSessionValid.js';

async function runProcess() {
  let browser = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    const cookiesExist = await isCookieExist();
    if (cookiesExist) {
      const sessionValid = await isSessionValid(page);
      if (sessionValid) {
        console.log('Session is valid.');
        await fetchAndCompareContent(page);
      } else {
        console.log('Session is invalid.');
        await handleLogin(page);
        await fetchAndCompareContent(page);
      }
    } else {
      // Cookies do not exist,
      console.log('Cookies do not exist.');
      await handleLogin(page);
      await fetchAndCompareContent(page);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}

export default runProcess;
