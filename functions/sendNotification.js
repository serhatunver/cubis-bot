import axios from 'axios';
import config from '../config/index.js';
import studentService from '../services/studentService.js';

async function sendNotification(differentCourses) {
  const botToken = config.telegram.botToken;
  const chatIdPublic = config.telegram.chatIdPublic;
  const chatIdPrivate = config.telegram.chatIdPrivate;

  // send message for each exam in each course that has a different score than the previous one saved in the database
  // and save the new score in the database for each exam in each course that has a different score than the previous one
  for (const newCourse of differentCourses) {
    for (const exam of newCourse.exams) {
      const messagePublic = `${newCourse.name} ${exam.name} notu girildi`;
      const messagePrivate = `${newCourse.name} ${exam.name} notu: ${exam.score}`;

      try {
        // send message to public chat
        const responsePublic = await sendMessage(chatIdPublic, messagePublic, botToken);
        if (responsePublic.status === 200) {
          console.log('Message sent to public chat.');
        }

        // send message to private chat
        const responsePrivate = await sendMessage(chatIdPrivate, messagePrivate, botToken);
        if (responsePrivate.status === 200) {
          console.log('Message sent to private chat.');
        }

        if (responsePublic.status === 200 && responsePrivate.status === 200) {
          // save new score in the database
          await studentService.SaveExam(config.cubis.username, newCourse.code, exam);
          console.log('New score saved in the database.');
        }
      } catch (error) {
        console.log('Error sending message.', error);
      }
    }
  }
}

async function sendMessage(chatId, message, botToken) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: message,
  };

  try {
    const response = await axios.post(url, body);
    return response;
  } catch (error) {
    console.log('Error sending message.', error.message);
  }
}

export default sendNotification;
