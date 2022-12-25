// Mine
import connect from "../db/connect.js";

async function editInDb(data) {
  if (!data || typeof data !== "object") throw new Error("invalid argmuents");
  const { tableName, compareValue, setValue, obj } = data;
  const keys = Object.keys(obj).join(" = ?, ") + " = ?";
  const values = Object.values(obj);
  try {
    connect.query(
      `UPDATE ${tableName} SET = ${keys} WHERE ${compareValue} = ?`,
      [...values, setValue]
    );
  } catch (err) {
    throw new Error(err.message);
  }
}

export default editInDb;
