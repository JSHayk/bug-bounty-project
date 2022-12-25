// Lib
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const assets_path = path.resolve() + "/src/upload/assets";

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
    expires_time: process.env.EXPIRESS_TIME || "1h",
  },
  storageConfig: {
    max_age: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
  uploadConfig: {
    projects_path: `${assets_path}/projects`,
  },
};

export default config;
