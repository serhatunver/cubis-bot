import { readFile, writeFile } from 'node:fs/promises';
import { differenceWith, isEqual } from 'lodash-es';
import notify from '../services/notify.js';
import isContentExist from '../helpers/isContentExist.js';

async function compareContent(newContent) {
  // Check if the content exists
  const contentExist = await isContentExist();
  if (contentExist) {
    // If the content exists, compare it with the new content
    const existingContent = JSON.parse(await readFile('./content.json'));

    const difference = differenceWith(newContent, existingContent, isEqual);

    if (difference.length > 0) {
      console.log('Difference found.');
      // If the contents are different, send a notification
      await notify(difference, existingContent);
    } else {
      console.log('No difference found.');
    }
  } else {
    // If the content does not exist, create it with the new content
    console.log('Content does not exist.');
    const data = JSON.stringify(newContent, null, 2);
    await writeFile('./content.json', data);
  }
}

export default compareContent;
