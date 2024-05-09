import axios from 'axios';
import config from '../config/index.js';
import saveContent from '../functions/saveContent.js';

async function notify(courses, existingContent) {
  for (const course of courses) {
    const message = `${course.name} ${Object.keys(course)[1]} notu girildi`;
    const botToken = config.telegram.botToken;
    const chatId = config.telegram.chatId;

    try {
      await sendMessage(chatId, message, botToken);
      existingContent.push(course);
      await saveContent(existingContent);
      console.log('Content saved.');
    } catch (error) {
      console.log('Error sending message.', error);
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
    await axios.post(url, body);
    console.log('Message sent.');
  } catch (error) {
    console.log('Error sending message.', error.message);
  }
}

export default notify;
