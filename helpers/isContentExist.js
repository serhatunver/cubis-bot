import fs from 'fs';

const isContentExist = () => {
  try {
    return fs.existsSync('./content.json');
  } catch (err) {
    console.log(err);
  }
};

export default isContentExist;

