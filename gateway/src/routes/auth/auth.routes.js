const { Router } = require('express');
const { login } = require('../../controllers/auth.controller');

// eslint-disable-next-line new-cap
const authRouter = Router();

authRouter.post('/login', login);

module.exports = authRouter;
