require('dotenv').config();
const express = require('express');
const db = require('../db/db-connection');

(async () => {
  try {
    await db().authenticate();
    console.log('connection successful');
  } catch (error) {
    console.log('err', error);
  }
  const app = express();

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from Auth' });
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `[Auth]: server is running at http://localhost:${process.env.PORT}`,
    );
  });
})();
