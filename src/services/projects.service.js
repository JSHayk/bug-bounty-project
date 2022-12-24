// Lib
import connect from "../db/connect.js";
import { NOT_FOUND_PRODUCT_RESPONSE } from "../const/responses.js";
// DTO
import projectDto from "../dtos/project.dto.js";
// Helpers
import addToDb from "../helpers/addToDb.js";

// Getting projects from DB
async function getProjectsFromDb() {
  const [projects] = await connect.query("SELECT * FROM projects");
  return projects;
}

const getProject = async (projectId) => {
  try {
    if (!projectId) throw new Error("invalid arguments");
    const project = await getProjectFromDbById(projectId);
    if (!project) return NOT_FOUND_PRODUCT_RESPONSE;
    const modifyedProject = projectDto.projectDto(project);

    return {
      statusCode: 200,
      data: {
        project: modifyedProject,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const addProject = async (projectData) => {
  try {
    if (!projectData) throw new Error("invalid arguments");
    addToDb(projectDto.unzipProjectDto(projectData));
  } catch (err) {
    throw new Error(err.message);
  }
};

// Helpers
async function getProjectFromDbById(projectId) {
  if (!projectId) throw new Error("invalid arguments");
  const [projects] = await connect.query(
    "SELECT * FROM projects WHERE id = ?",
    [projectId]
  );
  return projects[0];
}

async function addProjectToDb(projectData) {
  try {
    if (!projectData) throw new Error("invalid arguments");
    const { organization, title, description, reward } = projectData;
    await connect.query(
      "INSERT INTO projects (organization, title, description, reward_from, reward_to, created_at) VALUES(?, ?, ?, ?, ?, ?)",
      [organization, title, description, reward.from, reward.to, 2000]
    );
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  getProjectsFromDb,
  getProject,
  addProject,
};
