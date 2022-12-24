// Lib
import mysql2 from "mysql2/promise";
// Mine
import config from "../config/config.js";

const {
  dbConfig: { db_user, db_password, db_host, db_name },
} = config;
const connect = mysql2.createPool({
  user: db_user,
  password: db_password,
  host: db_host,
  database: db_name,
});

export default connect;
