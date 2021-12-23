require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const config = require('./config/config');
const router = require('./routes');
const errorsCentralHandler = require('./middlewares/errors');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_OPTION } = require('./config/config');

const app = express();

const mongoose = require('mongoose', DB_OPTION);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(helmet());
app.use(cors);
app.use(limiter);
app.use(router);

app.use(errors());
app.use(errorLogger);
app.use(errorsCentralHandler);

const { NODE_ENV } = process.env;
const { PORT, DB } = NODE_ENV === 'production' ? process.env : config;

app.listen(PORT, () => {
  console.log(`Server start http://localhost:${PORT}`);
});

mongoose.connect(DB);
