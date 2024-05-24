import isLoggedIn from './isLoggedIn.js';

async function isSessionValid(page, cookies) {
  try {
    await loadCookies(page, cookies);
    return await isLoggedIn(page);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadCookies(page, cookies) {
  try {
    await page.setCookie(...cookies);
  } catch (error) {
    console.log(error);
  }
}

export default isSessionValid;
