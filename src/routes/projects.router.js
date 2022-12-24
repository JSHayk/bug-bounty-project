// Lib
import express from "express";
// Mine
import projectsController from "../controllers/projects.controller.js";
import projectsService from "../services/projects.service.js";
// Helpers
import checkEmptyBody from "../helpers/checkEmptyBody.js";
import checkIdParam from "../helpers/checkIdParam.js";

const router = express();
// Getting all projects
router.get("/projects", projectsController.getProjects);
// Getting special project
router.get("/projects/:id", checkIdParam, projectsController.getProject);
// Adding project
router.post("/projects", checkEmptyBody, projectsController.addProject);
// Deleting project
router.delete("/projects/:id", projectsController.deleteProject);
export default router;
