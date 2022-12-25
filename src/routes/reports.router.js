// Lib
import express from "express";
// Mine
import reportsController from "../controllers/reports.controller.js";
// Helpers
import checkIdParam from "../helpers/checkIdParam.js";
import checkEmptyBody from "../helpers/checkEmptyBody.js";
import reportsMiddleware from "../middlewares/reports.middleware.js";

const router = express();
// Getting report
router.get(
  "/reports/:organizatorId",
  checkIdParam,
  reportsController.getReports
);
// Sending report
router.post(
  "/reports/:organizatorId/:projectId/:hunterId",
  checkIdParam,
  checkEmptyBody,
  reportsMiddleware.checkReportBody,
  reportsController.sendReport
);

export default router;
