// Lib
import dotenv from "dotenv";
dotenv.config();

const config = {
  appConfig: {
    port: process.env.PORT || 8080,
    sync_interval: process.env.SYNC_INTERVAL || 20000,
    client_url: process.env.CLIENT_URL || "http://localhost:3000",
  },
  dbConfig: {
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
  },
  tokenConfig: {
    token_secret: process.env.TOKEN_SECRET,
  },
  storageConfig: {
    max_age: process.env.MAX_AGE,
    httpOnly: true,
  },
};

export default config;
