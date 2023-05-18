const { ValidationError, DocumentNotFoundError, CastError } = require('mongoose').Error;

const UnauthorizedError = require('../errors/UnauthorizedError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(' ');
    return res.status(400).send({
      message: `Переданы некорректные данные. ${errMessage}`,
    });
  }

  if (err instanceof DocumentNotFoundError) {
    return res.status(404).send({
      message: 'Не найдена карточка с данным id',
    });
  }

  if (err instanceof CastError) {
    return res.status(400).send({
      message: `Передан некорректный id: ${err.value}`,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(409).send({
      message:
        'Указанный E-mail уже зарегистрирован. Пожалуйста используйте другой',
    });
  }

  res.status(500).send({
    message: `На сервере произошла ошибка ${err.name}: ${err.message}`,
  });
  return next();
});
