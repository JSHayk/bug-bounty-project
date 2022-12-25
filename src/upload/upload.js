// Lib
import path from "path";
import multer from "multer";
// Mine
import checkUploadPath from "../helpers/checkUploadPath.js";

// Upload Configuration
function $upload(num) {
  try {
    if (typeof num !== "number") throw new Error("The num must be");
    const dest = checkUploadPath(num);
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, path.resolve(dest));
      },
      filename: (req, file, callback) => {
        const newName = Date.now() + path.extname(file.originalname);
        callback(null, newName);
      },
    });
    return multer({ storage });
  } catch (err) {
    throw new Error(err.message);
  }
}

export default $upload;
