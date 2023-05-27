/* eslint-disable import/no-extraneous-dependencies */
const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const userRouter = Router();
const {
  getUsers, getUser, patchUser, getCurrentUser, patchUserAvatar, logout,
} = require('../controllers/users');
const RegExHttp = require('../utils/RegEx');

userRouter.get('', getUsers);

userRouter.get('/me', getCurrentUser);

userRouter.get('/:userId', celebrate({
  params: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), patchUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(RegExHttp).required(),
  }),
}), patchUserAvatar);

userRouter.delete('/me', logout);

module.exports = userRouter;
