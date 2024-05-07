import config from '../config/index.js';
import isLoggedIn from '../helpers/isLoggedIn.js';
import saveCookies from './saveCookies.js';

const login = async (page) => {
  try {
    await page.goto(config.cubis.login_url, {
      waitUntil: 'networkidle0'
    });

    // type username and password
    await page.waitForSelector(config.selector.username);
    await page.type(config.selector.username, config.cubis.username, {
      delay: 200
    });
    await page.waitForSelector(config.selector.password);
    await page.type(config.selector.password, config.cubis.password, {
      delay: 200
    });

    console.log('Logging in...');

    // click login button
    await page.waitForSelector(config.selector.submit);
    await page.click(config.selector.submit);

    await page.waitForTimeout(5000);

    const loggedIn = await isLoggedIn(page);

    if (loggedIn) {
      console.log('Logged in.');
      await saveCookies(page);
    } else {
      console.log('Failed to log in.');
      // Handle login failure...
    }
  } catch (err) {
    console.log(err);
  }
};

export default login;
