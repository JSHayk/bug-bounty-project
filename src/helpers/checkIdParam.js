// Mine
import validations from "../validations/index.js";

function checkIdParam(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return res.status(403).send({ message: "Invalid id!" });
  }
  next();
}

export default checkIdParam;
