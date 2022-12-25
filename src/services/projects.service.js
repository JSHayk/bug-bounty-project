// Mine
import connect from "../db/connect.js";
// CONST
import { NOT_FOUND_PRODUCT_RESPONSE } from "../const/responses.js";
import { PROJECTS_TABLE } from "../const/names.js";
import { SUCCESS_DELETED } from "../const/messages.js";
// DTO
import projectDto from "../dtos/project.dto.js";
// Helpers
// Queries
import addToDb from "../helpers/addToDb.js";
import deleteFromDb from "../helpers/deleteFromDb.js";
import editInDb from "../helpers/editInDb.js";
import getFromDbWithCondition from "../helpers/getFromDbWithCondition.js";
import getFromDb from "../helpers/getFromDb.js";

// Getting projects from DB
async function getProjectsFromDb() {
  const projects = await getFromDb(PROJECTS_TABLE);
  return modifyProjects(projects);
}

const getProject = async (projectId, organizatorId) => {
  try {
    if (!projectId || !organizatorId) throw new Error("invalid arguments");
    const [project] = await getFromDbWithCondition({
      tableName: PROJECTS_TABLE,
      condition: "(id = ? AND organizator_id = ?)",
      setValues: [projectId, organizatorId],
    });
    if (!project) return NOT_FOUND_PRODUCT_RESPONSE;
    const modifyedProject = projectDto.withRewardObj(project);

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

const addProject = async (organizatorId, projectData) => {
  try {
    if (!organizatorId || !projectData) throw new Error("invalid arguments");
    const modifyedProject = projectDto.withoutRewardObj({
      ...projectData,
      organizator_id: organizatorId,
    });
    addToDb(modifyedProject, PROJECTS_TABLE);
  } catch (err) {
    throw new Error(err.message);
  }
};

const editProject = async (projectId, projectData) => {
  if (!projectId || !projectData || typeof projectData !== "object")
    throw new Error("invalid arguments");
  try {
    await editInDb({
      tableName: PROJECTS_TABLE,
      compareValue: "id",
      setValue: projectId,
      obj: projectDto.withoutRewardObj(projectData),
    });

    return {
      statusCode: 200,
      data: {
        project: {},
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteProject = async (projectId) => {
  try {
    if (!projectId) throw new Error(err.message);
    await deleteFromDb({
      tableName: PROJECTS_TABLE,
      compareValue: "id",
      setValue: projectId,
    });
    return {
      statusCode: 200,
      message: SUCCESS_DELETED,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const uploadProject = async (id) => {
  try {
    if (!id) throw new Error("invalid arguments");

    return;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Helpers
function modifyProjects(projects) {
  return projects.map((item) => {
    return projectDto.withRewardObj(item);
  });
}

export default {
  getProjectsFromDb,
  getProject,
  addProject,
  editProject,
  deleteProject,
};
