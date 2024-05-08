import { access, constants } from 'node:fs/promises';

async function isContentExist() {
  try {
    return await access('content.json', constants.F_OK).then(() => true);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    } else {
      console.log(err);
    }
  }
}

export default isContentExist;
