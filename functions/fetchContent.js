import * as cheerio from 'cheerio';

const fetchContent = async (page) => {
  try {
    const $ = cheerio.load(await page.content());

    const content = $('hy')
      .filter((i, e) => $(e).text() !== '')
      .map((i, el) => {
        return {
          course: $(el)
            .parentsUntil('div')
            .find('h5')
            .text()
            .replace(/\n\s+/g, ''),
          [$(el).parent().prev().text()]: $(el).text()
        };
      })
      .get();

    return content;
  } catch (error) {
    console.log(error);
  }
};

export default fetchContent;

