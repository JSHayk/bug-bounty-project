// Lib
import jwt from "jsonwebtoken";
// Lib
import config from "../config/config.js";

const { tokenConfig } = config;

const generateToken = (data) => {
  try {
    const generatedToken = jwt.sign(data, tokenConfig.token_secret, {
      expiresIn: tokenConfig.expires_time,
    });
    return generatedToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  generateToken,
};
