// Mine
import connect from "../db/connect.js";

async function addToDb(addData) {
  try {
    const keys = Object.keys(addData).join(", ");
    const values = Object.values(addData);
    const placeholders = Array(Object.keys(addData).length)
      .fill("?")
      .join(", ");
    await connect.query(
      `INSERT INTO projects(${keys}) VALUES(${placeholders})`,
      [...values]
    );
  } catch (err) {
    throw new Error(err.message);
  }
}

export default addToDb;
