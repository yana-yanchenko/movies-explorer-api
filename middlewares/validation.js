const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const messages = require('../utils/messages');

const checkUrl = (link) => {
  const result = validator.isURL(link);
  if (result) {
    return link;
  }
  throw new Error(messages.err_valid_url);
};

module.exports.registerValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  }),
});

module.exports.loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  }),
});

module.exports.updateUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required(),
    email: Joi.string().email(),
  }),
});

module.exports.deleteMovieValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkUrl),
    trailer: Joi.string().required().custom(checkUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(checkUrl),
    movieId: Joi.number().required(),
  }),
});
