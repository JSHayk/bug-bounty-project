// Mine
import validations from "../validations/index.js";
import {
  INVALID_EMAIL,
  INCORRECT_PASSWORD,
  REQUIRED_PASSWORD,
  REQUIRED_TYPE,
} from "../const/messages.js";
// Helpers
import checkBody from "../helpers/checkBody.js";

const checkReportBody = (req, res, next) => {
  const { isChecked, statusCode, message } = checkBody(req.body, ["message"]);
  if (!isChecked) {
    return res.status(statusCode).send({ message });
  }
  next();
};

export default {
  checkReportBody,
};
