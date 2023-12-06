require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const authRouter = require('./routes/auth/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', proxy('products-service:3001'));
app.use('/customers', proxy('customers-service:3002'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Gateway' });
});

app.listen(process.env.PORT, () => {
  console.log(
    `[Gateway]: server is running at http://localhost:${process.env.PORT}`,
  );
});
