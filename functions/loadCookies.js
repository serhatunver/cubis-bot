import { readFile } from 'node:fs/promises';

async function loadCookies(page) {
  try {
    const cookiesString = await readFile('./cookies.json');
    const cookies = await JSON.parse(cookiesString);
    await page.setCookie(...cookies);
  } catch (error) {
    console.log(error);
  }
}

export default loadCookies;
