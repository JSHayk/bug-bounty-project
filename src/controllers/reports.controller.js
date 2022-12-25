// Mine
import reportsService from "../services/reports.service.js";

const getReports = async (req, res) => {
  const { organizatorId } = req.params;
  const { statusCode, data } = await reportsService.getReports(organizatorId);
  res.status(statusCode).send(data.reports);
  try {
  } catch (err) {
    throw new Error(err.message);
  }
};

const sendReport = async (req, res) => {
  const { organizatorId, hunterId, projectId } = req.params;
  try {
    const { statusCode, message } = await reportsService.sendReport(
      hunterId,
      projectId,
      organizatorId,
      req.body
    );
    res.status(statusCode).send({ message });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  sendReport,
  getReports,
};
