const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const idValidation = /[0-9A-Fa-f]{24}/;

// Validation Checking.
const isEmailValidated = (email) => {
  return email.match(emailValidation);
};

const isPasswordValidated = (password) => {
  return password.match(passwordValidation);
};

const isIdValidated = (id) => {
  return id.match(idValidation);
};

const isString = (checkValue) => {
  return typeof checkValue === "string";
};

export default {
  isEmailValidated,
  isPasswordValidated,
  isIdValidated,
  isString,
};
