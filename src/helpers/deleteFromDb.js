// Mine
import connect from "../db/connect.js";

async function deleteFromDb(data) {
  if (!data || typeof data !== "object") throw new Error("invalid arguments");
  const { tableName, compareValue, setValue } = data;
  try {
    await connect.query(`DELETE FROM ${tableName} WHERE ${compareValue} = ?`, [
      setValue,
    ]);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default deleteFromDb;
