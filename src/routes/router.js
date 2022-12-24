// Lib
import express from "express";
// Routes
import projectsRouter from "./projects.router.js";
import authRouter from "./auth.router.js";

const router = express();
// Switching routes
router.use(projectsRouter);
router.use(authRouter);

export default router;
