const axios = require('axios');

const loginHandler = async (req) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return {
      code: 400,
      message: 'Missing required parameters: email and password',
      data: null,
    };
  }

  try {
    const authResponse = await axios.post('http://auth-service:3003/login', {
      email,
      password,
    });
    const token = authResponse.data.token;
    return {
      code: 200,
      message: 'Ok',
      data: token,
    };
  } catch (error) {
    return {
      code: 401,
      message: 'Authentication failed',
      data: null,
    };
  }
};

module.exports = {
  loginHandler,
};
