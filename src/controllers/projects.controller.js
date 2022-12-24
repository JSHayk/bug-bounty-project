// Mine
import { SUCCESS_ADDED } from "../const/messages.js";
import projectsService from "../services/projects.service.js";
import store from "../store/index.js";

const getProjects = (req, res) => {
  const proejcts = store.getState().projects;
  res.status(200).send(proejcts);
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, data, message } = await projectsService.getProject(id);
    res.status(statusCode).send((data && data.project) || { message });
  } catch (err) {
    throw new Error(err.message);
  }
};

const addProject = async (req, res) => {
  try {
    await projectsService.addProject(req.body);
    res.status(200).send({ message: SUCCESS_ADDED });
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteProject = async (projectId) => {
  try {
    if (!projectId) throw new Error("invalid arguments");
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  getProjects,
  getProject,
  addProject,
  deleteProject,
};
