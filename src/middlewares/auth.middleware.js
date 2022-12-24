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

const checkRegisterBody = (req, res, next) => {
  const { isChecked, statusCode, message } = checkBody(req.body, [
    "email",
    "password",
    "type",
  ]);
  if (!isChecked) {
    return res.status(statusCode).send({ message });
  }
  next();
};

const checkAuthValidations = (req, res, next) => {
  const { email, password, type } = req.body;
  if (!validations.isEmailValidated(email))
    return res.status(422).send({ message: INVALID_EMAIL });
  if (!validations.isPasswordValidated(password))
    return res.status(422).send({ message: REQUIRED_PASSWORD });
  if (type == undefined)
    return res.status(422).send({ message: REQUIRED_TYPE });
  next();
};

export default {
  checkRegisterBody,
  checkAuthValidations,
};
