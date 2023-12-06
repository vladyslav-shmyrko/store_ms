const { loginHandler } = require('../services/auth.service');

const login = async (req, res, next) => {
  try {
    const { code, message, data } = await loginHandler(req);
    return res.status(code).json({ message, data });
  } catch (error) {
    return next();
  }
};

module.exports = {
  login,
};
