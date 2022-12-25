// Lib
import express from "express";
// Routes
import projectsRouter from "./projects.router.js";
import authRouter from "./auth.router.js";
import reportsRouter from "./reports.router.js";

const router = express();
// Switching routes
router.use(projectsRouter);
router.use(authRouter);
router.use(reportsRouter);

export default router;
