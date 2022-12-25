// Mine
import connect from "../db/connect.js";

async function sendNotification(id, count = 1) {
  try {
    await connect.query(
      "UPDATE users SET notifications_count = ? WHERE id = ?",
      [count, id]
    );
  } catch (err) {
    throw new Error(err.message);
  }
}

export default sendNotification;
