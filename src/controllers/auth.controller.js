// Mine
import authService from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const { statusCode, message } = await authService.register(req.body);
    res.status(statusCode).send({ message });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  register,
};
