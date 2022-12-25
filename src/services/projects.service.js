// Lib
import fs from "fs";
// Mine
import connect from "../db/connect.js";
// CONST
import { NOT_FOUND_PRODUCT_RESPONSE } from "../const/responses.js";
import { PROJECTS_TABLE } from "../const/names.js";
import { SUCCESS_DELETED } from "../const/messages.js";
import config from "../config/config.js";
// DTO
import projectDto from "../dtos/project.dto.js";
// Helpers
// Queries
import addToDb from "../helpers/addToDb.js";
import deleteFromDb from "../helpers/deleteFromDb.js";
import editInDb from "../helpers/editInDb.js";
import getFromDbWithCondition from "../helpers/getFromDbWithCondition.js";
import getFromDb from "../helpers/getFromDb.js";
import checkIsFileExist from "../helpers/checkIsFileExist.js";

const {
  uploadConfig: { projects_path },
} = config;

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

const getUploadedProject = async (imageName) => {
  const imagePath = `${projects_path}/${imageName}`;
  if (!checkIsFileExist(imagePath))
    return {
      statusCode: 404,
      message: "There is no upload",
    };
  const readStream = fs.createReadStream(imagePath);
  return {
    statusCode: 200,
    data: {
      readStream,
    },
  };
};

const addProject = async (organizatorId, projectData) => {
  try {
    if (!organizatorId || !projectData) throw new Error("invalid arguments");
    const modifyedProject = projectDto.withoutRewardObj({
      ...projectData,
      organizator_id: organizatorId,
    });
    await addToDb(modifyedProject, PROJECTS_TABLE);
    const [project] = await getFromDbWithCondition({
      tableName: PROJECTS_TABLE,
      need: "id",
      condition: "organizator_id = ?",
      setValues: [organizatorId],
    });
    return {
      statusCode: 200,
      data: {
        project,
      },
    };
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

const uploadProject = async (organizatorId, filename) => {
  try {
    if (!organizatorId || !filename) throw new Error("invalid arguments");
    await connect.query(
      "UPDATE projects SET image_url = ? WHERE organizator_id = ? ",
      [filename, organizatorId]
    );
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
  getUploadedProject,
  addProject,
  editProject,
  deleteProject,
  uploadProject,
};
