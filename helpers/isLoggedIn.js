import config from '../config/index.js';

async function isLoggedIn(page) {
  try {
    await page.goto(config.cubis.courses_url, {
      waitUntil: 'networkidle0',
    });

    return page.url() === config.cubis.courses_url;
  } catch (error) {
    console.log(error);
    console.log('Login failed.');
    return false;
  }
}

export default isLoggedIn;
