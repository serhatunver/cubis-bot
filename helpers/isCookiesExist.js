import fs from 'fs';

const isCookiesExist = () => {
  try {
    return fs.existsSync('./cookies.json');
  } catch (err) {
    console.log(err);
  }
};

export default isCookiesExist;

