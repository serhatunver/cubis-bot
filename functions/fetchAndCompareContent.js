import { readFile, writeFile } from 'node:fs/promises';
import { differenceWith, isEqual } from 'lodash-es';
import * as cheerio from 'cheerio';
import sendNotification from '../services/sendNotification.js';
import isContentExist from '../helpers/isContentExist.js';
import saveContent from './saveContent.js';

async function fetchAndCompareContent(page) {
  try {
    // Fetch the new content
    const newContent = await fetchContent(page);

    // Check if the content exists
    const contentExist = await isContentExist();
    if (contentExist) {
      // If the content exists, compare it with the new content
      const difference = await compareContent(newContent);
      if (difference.length > 0) {
        // If the contents are different, send a notification
        console.log('Difference found.');
        await sendNotification(difference);
      } else {
        console.log('No difference found.');
      }
    } else {
      // If the content does not exist, save the new content
      console.log('Content does not exist.');
      await saveContent(newContent);
    }
  } catch (error) {
    console.error('Error fetching and comparing content:', error);
  }
}

async function fetchContent(page) {
  try {
    const $ = cheerio.load(await page.content());

    const content = $('hy')
      .filter((i, e) => $(e).text() !== '') // Filter out elements with no text
      .map((i, el) => {
        // For each element, return an object with the name and other data
        return {
          name: $(el).parentsUntil('div').find('h5').text().replace(/\n\s+/g, ''), // Remove newline and whitespace characters
          [$(el).parent().prev().text()]: $(el).text(),
        };
      })
      .get(); // Convert the Cheerio object to a regular array

    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}

async function compareContent(newContent) {
  try {
    const existingContent = JSON.parse(await readFile('./content.json'));
    const difference = differenceWith(newContent, existingContent, isEqual);

    return difference;
  } catch (error) {
    console.error('Error comparing content:', error);
  }
}

export default fetchAndCompareContent;
