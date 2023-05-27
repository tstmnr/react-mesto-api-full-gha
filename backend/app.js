/* eslint-disable no-console */
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
const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

require('dotenv').config();

const app = express();

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Присоеденился к базе');
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе');
    console.error(err);
  });

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// подключаем мидлвары, роуты и всё остальное...
app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('app available on port: ', PORT);
});
