function checkIdParam(req, res, next) {
  const { id } = req.params;
  // Object.keys(req.params).filter()
  if (id && id.toLowerCase().includes("id")) {
    if (!Number(id)) {
      return res.status(403).send({ message: "Invalid id!" });
    }
  }
  next();
}

export default checkIdParam;
