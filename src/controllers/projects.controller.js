// Mine
import store from "../store/index.js";

const getProjects = (req, res) => {
  const proejcts = store.getState().projects;
  res.status(200).send(proejcts);
};

export default {
  getProjects,
};
