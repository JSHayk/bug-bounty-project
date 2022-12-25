function checkUploadFile(req, res, next) {
  if (!req.file) return res.status(404).send({ message: "Not Choo" });
  next();
}

export default checkUploadFile;
