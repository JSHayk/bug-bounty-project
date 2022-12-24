// Mine
import { EMPTY_BODY } from "../const/messages.js";

const checkEmptyBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: EMPTY_BODY });
  }
  next();
};

export default checkEmptyBody;
