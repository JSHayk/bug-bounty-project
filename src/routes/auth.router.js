// Lib
import express from "express";
// Mine
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
// Helpers
import checkEmptyBody from "../helpers/checkEmptyBody.js";

const router = express();
// Register
router.post(
  "/register",
  checkEmptyBody,
  authMiddleware.checkRegisterBody,
  authMiddleware.checkAuthValidations,
  authController.register
);

export default router;
