// Lib
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Mine
import config from "./config/config.js";
import store from "./store/index.js";
import router from "./routes/router.js";

// App Configuration
const { appConfig } = config;
const app = express();
// Middlewares
app.use(express.json()); // Allowing access for json data
app.use(express.urlencoded({ extended: true })); // Allowing access for formData
app.use(cookieParser()); // Saving token in cookies
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // Allowing access from client
app.use("/api", router); // Switching routes by '/api'
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
}); // Simple Not Found

setInterval(store.sync, appConfig.sync_interval); // Getting data from db with certain time
(async () => {
  try {
    await store.sync(); // waiting for each fetch
    app.listen(appConfig.port, () => {
      // Everyting is ok
      console.log(`Server has been listened on port ${appConfig.port}`);
    });
  } catch (err) {
    throw new Error(err.message);
  }
})();
