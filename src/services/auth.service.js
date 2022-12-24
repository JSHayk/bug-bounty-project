// Lib
import bcrypt from "bcrypt";
// Mine
import connect from "../db/connect.js";
import tokenService from "./token.service.js";
import userDto from "../dtos/user.dto.js";

import {
  SUCCESS_REGISTER,
  SUCCESS_LOGIN,
  NOT_FOUND_USER,
  EXIST_EMAIL,
  INCORRECT_PASSWORD,
} from "../const/messages.js";

const register = async (authData) => {
  const { email, password, type } = authData;
  if (!email || !password || !type) throw new Error("invalid arguments");
  const user = await getUserFromDbByEmail(email);
  if (user)
    return {
      statusCode: 403,
      message: EXIST_EMAIL,
    };
  const hashedPassword = await bcrypt.hash(password, 10);
  await addUser({ ...authData, password: hashedPassword });
  return {
    statusCode: 200,
    message: SUCCESS_REGISTER,
  };
};

const login = async (authData) => {
  try {
    const { email, password } = authData;
    if (!email || !password) throw new Error("invalid arguments");
    const user = await getUserFromDbByEmail(email);
    if (!user) {
      return {
        statusCode: 403,
        message: NOT_FOUND_USER,
      };
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return {
        statusCode: 422,
        message: INCORRECT_PASSWORD,
      };
    }
    const modifyedUser = userDto(user);
    const generatedToken = tokenService.generateToken(modifyedUser);

    return {
      statusCode: 200,
      data: {
        user: modifyedUser,
        token: generatedToken,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

// Helpers
async function getUserFromDbByEmail(email) {
  try {
    const [users] = await connect.query(
      "SELECT * FROM users WHERE email = ?",
      email
    );
    return users[0];
  } catch (err) {
    throw new Error(err.message);
  }
}
async function addUser(userData) {
  try {
    const { email, password, type } = userData;
    await connect.query(
      "INSERT INTO users(email, password, type) VALUES(?, ?, ?)",
      [email, password, type]
    );
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  register,
  login,
};
