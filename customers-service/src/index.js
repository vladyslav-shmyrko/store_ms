require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Customers' });
});

app.listen(process.env.PORT, () => {
  console.log(`[Customers]: server is running at http://localhost:${process.env.PORT}`);
});
