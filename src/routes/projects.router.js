// Lib
import express from "express";
// Mine
import projectsController from "../controllers/projects.controller.js";
import projectsService from "../services/projects.service.js";
// Helpers
import checkEmptyBody from "../helpers/checkEmptyBody.js";

const router = express();
// Getting all projects
router.get("/projects", projectsController.getProjects);

export default router;
