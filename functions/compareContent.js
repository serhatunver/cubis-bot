import fs from 'fs';
import { differenceWith, isEqual } from 'lodash-es';
import notify from '../services/notify.js';
import isContentExist from '../helpers/isContentExist.js';

const compareContent = async (newContent) => {
  // Check if the file exists
  const contentExists = isContentExist();
  if (contentExists) {
    // If the file exists, compare it with the new content
    const existingContent = JSON.parse(fs.readFileSync('./content.json'));

    const difference = differenceWith(newContent, existingContent, isEqual);

    if (difference.length > 0) {
      console.log('Difference found.');
      // If the contents are different, send a notification
      await notify(difference, existingContent);
    } else {
      console.log('No difference found.');
    }
  } else {
    // If the file does not exist, create it with the new content
    console.log('File does not exist.');
    fs.writeFileSync('./content.json', JSON.stringify(newContent, null, 2));
  }
};

export default compareContent;

