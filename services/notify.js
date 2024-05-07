import config from '../config/index.js';
import saveContent from '../functions/saveContent.js';

const notify = async (items, existingContent) => {
  try {
    items.forEach(async (item) => {
      const msg = `${item.course} ${Object.keys(item)[1]} notu girildi`;
      const url = `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage?chat_id=${config.telegram.chatId}&text=${msg}`;

      await fetch(url)
        .then(async (response) => {
          if (response.ok) {
            console.log('Message sent.');
            await existingContent.push(item);
            await saveContent(existingContent);
          } else {
            console.log('Error sending message.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } catch (err) {
    console.log(err);
  }
};

export default notify;

