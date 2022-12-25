// Mine
import connect from "../db/connect.js";

async function getFromDbWithCondition(data) {
  try {
    if (!data || typeof data !== "object") throw new Error("invalid arguments");
    const { need = "*", setValues, tableName, condition } = data;
    const [arr] = await connect.query(
      `SELECT ${need} FROM ${tableName} WHERE ${condition}`,
      [...setValues]
    );
    return arr;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default getFromDbWithCondition;
