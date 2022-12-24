// Mine
import config from "../config/config.js";
import authService from "../services/auth.service.js";

const { storageConfig } = config;

const register = async (req, res) => {
  try {
    const { statusCode, message } = await authService.register(req.body);
    res.status(statusCode).send({ message });
  } catch (err) {
    throw new Error(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { statusCode, data, message } = await authService.login(req.body);
    if (statusCode !== 200) {
      return res.status(statusCode).send({ message });
    }
    res.cookie("token", data.token, {
      maxAge: storageConfig.max_age,
      httpOnly: storageConfig.httpOnly,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  register,
  login,
};
