import fs from 'fs';

const saveCookies = async (page) => {
  try {
    const cookiesObject = await page.cookies();
    fs.writeFileSync('./cookies.json', JSON.stringify(cookiesObject, null, 2));
  } catch (error) {
    console.log(error);
  }
};

export default saveCookies;

