import fs from 'fs';

const loadCookies = async (page) => {
  try {
    const cookiesString = fs.readFileSync('./cookies.json');
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);
  } catch (error) {
    console.log(error);
  }
};

export default loadCookies;

