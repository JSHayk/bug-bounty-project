// Mine
import connect from "../db/connect.js";

async function getFromDb(tableName) {
  if (!tableName) throw new Error("invalid arguments");
  try {
    const [arr] = await connect.query(`SELECT * FROM ${tableName}`);
    return arr;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default getFromDb;
