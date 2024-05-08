import { writeFile } from 'node:fs/promises';

async function saveContent(content) {
  try {
    const data = JSON.stringify(content, null, 2);
    await writeFile('./content.json', data);
  } catch (err) {
    console.log(err);
  }
}

export default saveContent;
