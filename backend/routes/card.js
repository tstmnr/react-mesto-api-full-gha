/* eslint-disable import/no-extraneous-dependencies */
const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const cardRouter = Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const RegExHttp = require('../utils/RegEx');

cardRouter.get('', getCards);

cardRouter.post('', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(RegExHttp).required(),
  }),
}), createCard);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = cardRouter;
