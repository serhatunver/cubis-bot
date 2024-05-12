import { readFile } from 'node:fs/promises';
import isLoggedIn from './isLoggedIn.js';

async function isSessionValid(page) {
  try {
    await loadCookies(page);
    return await isLoggedIn(page);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadCookies(page) {
  try {
    const cookiesString = await readFile('./cookies.json');
    const cookies = await JSON.parse(cookiesString);
    await page.setCookie(...cookies);
  } catch (error) {
    console.log(error);
  }
}

export default isSessionValid;
