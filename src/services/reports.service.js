// Mine
// CONST
import { PROJECTS_TABLE, REPORTS_TABLE, USERS_TABLE } from "../const/names.js";
import { SUCCESS_SEND_REPORT_RESPONSE } from "../const/responses.js";
import connect from "../db/connect.js";
// Helpers
import addToDb from "../helpers/addToDb.js";
import getFromDbWithCondition from "../helpers/getFromDbWithCondition.js";
import sendNotification from "../helpers/sendNotification.js";

const getReports = async (organizator_id) => {
  if (!organizator_id) throw new Error("invalid arguments");
  try {
    const reports = await getFromDbWithCondition({
      tableName: REPORTS_TABLE,
      condition: "organizator_id = ?",
      setValues: [organizator_id],
    });
    return {
      statusCode: 200,
      data: {
        reports,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const sendReport = async (
  organizator_id,
  hunter_id,
  project_id,
  projectData
) => {
  if (!hunter_id || !project_id || !projectData)
    throw new Error("invalid arguments");
  try {
    await addToDb(
      {
        ...projectData,
        hunter_id: Number(hunter_id),
        project_id: Number(project_id),
        organizator_id: Number(organizator_id),
      },
      REPORTS_TABLE
    );
    const [{ notifications_count }] = await getFromDbWithCondition({
      need: "notifications_count",
      tableName: USERS_TABLE,
      condition: "id = ?",
      setValues: [organizator_id],
    });
    await sendNotification(organizator_id, notifications_count + 1);
    return SUCCESS_SEND_REPORT_RESPONSE;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  getReports,
  sendReport,
};
