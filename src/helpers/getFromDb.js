// Lib
import connect from "../db/connect.js";

async function getFromDb(data) {
  try {
    const { need = "*", compareValue, setValue, dbName } = data;
    const [arr] = await connect.query(
      `SELECT ${need} FROM ${dbName} WHERE ${compareValue} = ?`,
      [setValue]
    );
    return arr;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default getFromDb;
