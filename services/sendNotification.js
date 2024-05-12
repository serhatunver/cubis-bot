import { readFile } from 'node:fs/promises';
import axios from 'axios';
import config from '../config/index.js';
import saveContent from '../functions/saveContent.js';

async function sendNotification(courses) {
  const botToken = config.telegram.botToken;
  const chatId = config.telegram.chatId;

  for (const course of courses) {
    const message = `${course.name} ${Object.keys(course)[1]} notu girildi`;

    try {
      const response = await sendMessage(chatId, message, botToken);
      if (response.data.ok) {
        console.log('Message sent.');
        const existingContent = JSON.parse(await readFile('./content.json'));
        existingContent.push(course);
        await saveContent(existingContent);
        console.log('Content saved.');
      }
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
    const response = await axios.post(url, body);
    return response;
  } catch (error) {
    console.log('Error sending message.', error.message);
  }
}

export default sendNotification;
