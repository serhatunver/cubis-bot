import fs from 'fs';

const saveContent = async (content) => {
  try {
    fs.writeFileSync('./content.json', JSON.stringify(content, null, 2));
  } catch (err) {
    console.log(err);
  }
};

export default saveContent;

