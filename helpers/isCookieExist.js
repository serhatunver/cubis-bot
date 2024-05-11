import { access, constants } from 'node:fs/promises';

async function isCookieExist() {
  try {
    return await access('cookies.json', constants.F_OK).then(() => true);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    } else {
      console.log(err);
    }
  }
}

export default isCookieExist;
