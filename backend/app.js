/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const helmet = require('helmet');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

require('dotenv').config();

const app = express();

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// подключаем мидлвары, роуты и всё остальное...
app.use(requestLogger);

app.use('/users', userRouter, auth);
app.use('/cards', cardRouter, auth);
app.post('/signin', login);
app.post('/signup', createUser);

app.use(errorLogger);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use(celebrateErrors());
app.use(errors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('app available on port: ', PORT);
});
