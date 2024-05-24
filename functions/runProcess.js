import config from '../config/index.js';
import launchBrowser from './launchBrowser.js';
import fetchAndCompareCourses from './fetchAndCompareCourses.js';
import handleLogin from './handleLogin.js';
import isSessionValid from '../helpers/isSessionValid.js';
import studentService from '../services/studentService.js';

async function runProcess() {
  let browser = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    const studentId = config.cubis.username;
    const student = await studentService.GetStudent(studentId);
    // if student does not exist, create a new student
    if (!student) {
      console.log('Student does not exist.');
      await studentService.CreateStudent({ studentId });
      await handleLogin(page);
      await fetchAndCompareCourses(page);
    } else {
      const cookies = student.cookies;
      if (cookies.length > 0) {
        const sessionValid = await isSessionValid(page, cookies);
        if (sessionValid) {
          console.log('Session is valid.');
          await fetchAndCompareCourses(page);
        } else {
          console.log('Session is invalid.');
          await handleLogin(page);
          await fetchAndCompareCourses(page);
        }
      } else {
        // Cookies do not exist,
        console.log('Cookies do not exist.');
        await handleLogin(page);
        await fetchAndCompareCourses(page);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}

export default runProcess;
