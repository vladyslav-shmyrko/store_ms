require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
   console.log('req', req.path);
   res.status(200).json({ message: 'Hello from Products' });
});

app.listen(process.env.PORT, () => {
   console.log(`[Products]: server is running at http://localhost:${process.env.PORT}`);
});
