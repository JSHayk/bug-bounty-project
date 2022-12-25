// Lib
import express from "express";
// Mine
import projectsController from "../controllers/projects.controller.js";
import $upload from "../upload/upload.js";
// Helpers
import checkEmptyBody from "../helpers/checkEmptyBody.js";
import checkIdParam from "../helpers/checkIdParam.js";
import checkUploadFile from "../helpers/checkUploadFile.js";

const upload = $upload(1);
const router = express();
// Getting all projects
router.get("/all-projects", projectsController.getAllProjects);
// Getting special project
router.get(
  "/projects/:organizatorId/:projectId",
  checkIdParam,
  projectsController.getProject
);
// Getting uploaded project
router.get("/projects/:imageName", projectsController.getUploadedProject);
// Adding project
router.post(
  "/projects/:id",
  checkIdParam,
  checkEmptyBody,
  projectsController.addProject
);
router.post(
  "/projects/upload/:organizatorId/:projectId",
  upload.single("image"),
  checkUploadFile,
  projectsController.uploadProject
);
// Editing project
// router.put(
//   "/projects/:id",
//   checkIdParam,
//   checkEmptyBody,
//   projectsController.editProject
// );
// Deleting project
router.delete("/projects/:id", checkIdParam, projectsController.deleteProject);
export default router;
