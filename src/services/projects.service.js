// Lib
import connect from "../db/connect.js";

// Getting projects from DB
async function getProjectsFromDb() {
  const projects = await connect.query("SELECT * FROM projects");
  return projects;
}

export default {
  getProjectsFromDb,
};
