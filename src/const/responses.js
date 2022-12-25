// Mine
import {
  NOT_FOUND_PRODUCT,
  REQUIRE_FILE,
  SUCCESS_SEND_REPORT,
  SUCCESS_UPLOAD,
} from "./messages.js";

// NOT FOUND
export const NOT_FOUND_PRODUCT_RESPONSE = getResponse(404, NOT_FOUND_PRODUCT);
export const REQUIRE_FILE_RESPONSE = getResponse(404, REQUIRE_FILE);
// SUCCESS
export const SUCCESS_SEND_REPORT_RESPONSE = getResponse(SUCCESS_SEND_REPORT);
export const SUCCESS_UPLOAD_RESPONSE = getResponse(SUCCESS_UPLOAD);

function getResponse(ms, sc = 200) {
  return {
    statusCode: sc,
    message: ms,
  };
}
