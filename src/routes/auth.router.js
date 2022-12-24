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
  authMiddleware.checkRegisterValidations,
  authController.register
);
// Login
router.post(
  "/login",
  checkEmptyBody,
  authMiddleware.checkLoginBody,
  authMiddleware.checkLoginValidations,
  authController.login
);

export default router;
