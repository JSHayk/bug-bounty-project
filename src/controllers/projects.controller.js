// Mine
import { SUCCESS_ADDED } from "../const/messages.js";
import projectsService from "../services/projects.service.js";
import store from "../store/index.js";

const getAllProjects = (req, res) => {
  const proejcts = store.getState().projects;
  res.status(200).send(proejcts);
};

const getProject = async (req, res) => {
  const { projectId, organizatorId } = req.params;
  try {
    const { statusCode, data, message } = await projectsService.getProject(
      projectId,
      organizatorId
    );
    res.status(statusCode).send((data && data.project) || { message });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUploadedProject = async (req, res) => {
  const { imageName } = req.params;
  if (!imageName) throw new Error("invalid arguments");
  try {
    const { statusCode, data } = await projectsService.getUploadedProject(
      imageName
    );
    if (statusCode !== 200) {
      res.status(statusCode).send({ message: "bad" });
    }
    data?.readStream.pipe(res);
  } catch (err) {
    throw new Error(err.message);
  }
};

const addProject = async (req, res) => {
  const { id } = req.params;
  try {
    const { statusCode, data } = await projectsService.addProject(id, req.body);
    res.status(statusCode).send(data.project);
  } catch (err) {
    throw new Error(err.message);
  }
};

const editProject = async (req, res) => {
  const { id } = req.params;
  try {
    const { statusCode, message, data } = await projectsService.editProject(
      id,
      req.body
    );
    res.status(statusCode).send((data && data.project) || { message });
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const { statusCode, message } = await projectsService.deleteProject(id);
    res.status(statusCode).send({ message });
  } catch (err) {
    throw new Error(err.message);
  }
};

const uploadProject = async (req, res) => {
  const { organizatorId } = req.params;
  const { filename } = req.file;
  try {
    await projectsService.uploadProject(organizatorId, filename);
    res.status(200).send({ message: "Success uploaded" });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  getAllProjects,
  getProject,
  getUploadedProject,
  addProject,
  editProject,
  deleteProject,
  uploadProject,
};
