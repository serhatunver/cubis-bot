import config from '../config/index.js';
import isLoggedIn from '../helpers/isLoggedIn.js';
import studentService from '../services/studentService.js';

async function handleLogin(page) {
  try {
    await login(page);
    const loggedIn = await isLoggedIn(page);

    if (loggedIn) {
      console.log('Logged in.');
      const cookies = await page.cookies();
      await saveCookies(cookies);
    } else {
      console.log('Failed to log in.');
      // Handle login failure...
    }
  } catch (error) {
    console.log(error);
  }
}

async function login(page) {
  try {
    await page.goto(config.cubis.login_url, {
      waitUntil: 'networkidle0',
    });

    // type username and password
    await page.waitForSelector(config.selector.username);
    await page.type(config.selector.username, config.cubis.username);
    await page.waitForSelector(config.selector.password);
    await page.type(config.selector.password, config.cubis.password);

    console.log('Logging in...');

    // click login button
    await page.waitForSelector(config.selector.submit);
    await page.click(config.selector.submit);

    await page.waitForSelector(config.selector.login_success);
  } catch (err) {
    console.log(err);
  }
}

async function saveCookies(cookies) {
  try {
    const studentId = config.cubis.username;

    await studentService.SaveCookies(studentId, cookies);

    console.log('Cookies saved.');
  } catch (error) {
    console.log(error);
  }
}

export default handleLogin;
