// Lib
// Mine
import connect from "../db/connect.js";
import {
  SUCCESS_REGISTER,
  SUCCESS_LOGIN,
  NOT_FOUND_USER,
  EXIST_EMAIL,
} from "../const/messages.js";

const register = async (authData) => {
  const { email, password, type } = authData;
  if (!email || !password || type == undefined)
    throw new Error("invalid arguments");
  const user = await getUserFromDbByEmail(email);
  if (user)
    return {
      statusCode: 200,
      message: EXIST_EMAIL,
    };
  await addUser(authData);
  return {
    statusCode: 200,
    message: SUCCESS_REGISTER,
  };
};

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
};
