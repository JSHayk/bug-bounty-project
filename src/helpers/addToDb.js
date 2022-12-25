// Mine
import connect from "../db/connect.js";

async function addToDb(addData, tableName) {
  try {
    if (!addData || typeof addData !== "object" || !tableName)
      throw new Error("invalid arguments");
    const keys = Object.keys(addData).join(", ");
    const values = Object.values(addData);
    const placeholders = Array(Object.keys(addData).length)
      .fill("?")
      .join(", ");
    await connect.query(
      `INSERT INTO ${tableName}(${keys}) VALUES(${placeholders})`,
      [...values]
    );
  } catch (err) {
    throw new Error(err.message);
  }
}

export default addToDb;
