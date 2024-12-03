import config from '../config/index.js';
import { differenceWith, isEqual } from 'lodash-es';
import * as cheerio from 'cheerio';
import sendNotification from './sendNotification.js';
import studentService from '../services/studentService.js';

async function fetchAndCompareCourses(page) {
  try {
    // Fetch the new content
    const newCourses = await fetchCourses(page);

    // Check if the courses exists
    let courses = await studentService.GetCourses(config.cubis.username);
    if (courses.length > 0) {
      // If the courses exists, compare it with the new courses
      const differentCourses = await compareCourses(newCourses, courses);
      if (differentCourses.length > 0) {
        // If the courses are different, send a notification
        console.log('Difference found.');
        await sendNotification(differentCourses);
      } else {
        console.log('No difference found.');
      }
    } else {
      // If the courses does not exist, save the new courses
      console.log('Courses does not exist.');
      const studentId = config.cubis.username;
      await studentService.SaveCourses(studentId, newCourses);
      console.log('Courses saved.');
    }
  } catch (error) {
    console.error('Error fetching and comparing content:', error);
  }
}

async function fetchCourses(page) {
  try {
    const $ = cheerio.load(await page.content());

    const courses = $('h5')
      .map((i, el) => {
        return {
          code: $(el).text().split('-').shift().trim(),
          name: $(el).text().split('-').pop().trim(),
          exams: $(el)
            .parentsUntil('div')
            .find('hy')
            .filter((i, x) => $(x).text() !== '' && $(x).text() >= 0)
            .map((i, el) => {
              return {
                name: $(el).parent().prev().text(),
                score: $(el).text(),
              };
            })
            .get(),
        };
      })
      .get();

    return courses;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}

async function compareCourses(newCourses, courses) {
  try {
    // Map the courses and exams to compare them
    courses = courses.map((course) => {
      return {
        code: course.code,
        name: course.name,
        exams: course.exams.map((exam) => {
          return {
            name: exam.name,
            score: exam.score,
          };
        }),
      };
    });

    let differences = [];

    for (const newCourse of newCourses) {
      const course = courses.find((course) => {
        return course.code === newCourse.code;
      });

      const difference = differenceWith(newCourse.exams, course?.exams, isEqual);

      if (difference.length > 0) {
        differences.push({
          code: newCourse.code,
          name: newCourse.name,
          exams: difference,
        });
      }
    }

    return differences;
  } catch (error) {
    console.error('Error comparing content:', error);
  }
}

export default fetchAndCompareCourses;
export { fetchCourses, compareCourses };
