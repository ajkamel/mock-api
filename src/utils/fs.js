import fs from 'fs';
import util from 'util';

export default {
  readFile: util.promisify(fs.readFile),
  readdirSync: fs.readdirSync,
  unlink: util.promisify(fs.unlink),
};
