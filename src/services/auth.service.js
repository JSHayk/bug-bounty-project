// Lib
import bcrypt from "bcrypt";
// Mine
import {
  SUCCESS_REGISTER,
  SUCCESS_LOGIN,
  NOT_FOUND_USER,
  EXIST_EMAIL,
  INCORRECT_PASSWORD,
} from "../const/messages.js";
import connect from "../db/connect.js";
import tokenService from "./token.service.js";
// DTO
import userDto from "../dtos/user.dto.js";
// CONST
import { USERS_TABLE } from "../const/names.js";
// Helpers
import addToDb from "../helpers/addToDb.js";
import getFromDbWithCondition from "../helpers/getFromDbWithCondition.js";

const register = async (authData) => {
  const { email, password, type } = authData;
  if (!email || !password || !type) throw new Error("invalid arguments");
  const [user] = await getFromDbWithCondition({
    tableName: USERS_TABLE,
    condition: "email = ?",
    setValues: [email],
  });
  if (user)
    return {
      statusCode: 403,
      message: EXIST_EMAIL,
    };
  const hashedPassword = await bcrypt.hash(password, 10);
  await addToDb({ ...authData, password: hashedPassword }, "users");
  return {
    statusCode: 200,
    message: SUCCESS_REGISTER,
  };
};

const login = async (authData) => {
  try {
    const { email, password } = authData;
    if (!email || !password) throw new Error("invalid arguments");
    const [user] = await getFromDbWithCondition({
      tableName: USERS_TABLE,
      condition: "email = ?",
      setValues: [email],
    });
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

export default {
  register,
  login,
};
