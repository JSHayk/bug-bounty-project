// Lib
import fs from "fs";

const checkIsFileExist = (path) => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default checkIsFileExist;
