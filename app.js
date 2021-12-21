require('dotenv').config();
const express = require('express');
const config = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const mongoose = require('mongoose', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { NODE_ENV } = process.env;
const { PORT, DB } = NODE_ENV === 'production' ? process.env : config;


app.listen(PORT, () => {
  console.log(`Server start http://localhost:${PORT}`);
});

mongoose.connect(DB);