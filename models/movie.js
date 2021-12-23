const mongoose = require('mongoose');
const validator = require('validator');
const messages = require('../utils/messages');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link, { require_protocol: true }),
      message: messages.err_valid_url,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link, { require_protocol: true }),
      message: messages.err_valid_url,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link, { require_protocol: true }),
      message: messages.err_valid_url,
    },
  },
  owner: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
