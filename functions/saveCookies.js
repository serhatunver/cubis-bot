import { writeFile } from 'node:fs/promises';

async function saveCookies(page) {
  try {
    const cookiesObject = await page.cookies();
    const cookiesJson = JSON.stringify(cookiesObject, null, 2);
    await writeFile('./cookies.json', cookiesJson);
  } catch (error) {
    console.log(error);
  }
}

export default saveCookies;
