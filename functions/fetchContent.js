import * as cheerio from 'cheerio';

async function fetchContent(page) {
  try {
    const $ = cheerio.load(await page.content());

    const content = $('hy')
      .filter((i, e) => $(e).text() !== '') // Filter out elements with no text
      .map((i, el) => {
        // For each element, return an object with the name and other data
        return {
          name: $(el)
            .parentsUntil('div')
            .find('h5')
            .text()
            .replace(/\n\s+/g, ''), // Remove newline and whitespace characters
          [$(el).parent().prev().text()]: $(el).text(),
        };
      })
      .get(); // Convert the Cheerio object to a regular array

    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}

export default fetchContent;
