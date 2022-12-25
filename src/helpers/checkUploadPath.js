// Mine
import config from "../config/config.js";
const {
  uploadConfig: { projects_path },
} = config;

function checkUploadPath(num) {
  if (!num) throw new Error("invalid arguments");
  switch (num) {
    case 1:
      return projects_path;
    default:
      throw new Error("must be choose where need set the path");
  }
}

export default checkUploadPath;
