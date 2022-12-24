// Mine
import projectsService from "../services/projects.service.js";

// State
let projects = [];

function getState() {
  return {
    projects,
  };
}

async function sync() {
  try {
    projects = await projectsService.getProjectsFromDb();
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  getState,
  sync,
};
