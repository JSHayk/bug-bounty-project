// Lib
import express from "express";
// Routes
import projectsRouter from "./projects.router.js";

const router = express();
// Switching routes
router.use(projectsRouter);

export default router;
