const mongoose = require('mongoose');
const validator = require('validator');

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
      validator: (link) => {
        validator.isUrl(link, {
          require_protocol: true
        })
      },
      message: "g"
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        validator.isUrl(link, {
          require_protocol: true
        })
      },
      message: "g"
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        validator.isUrl(link, {
          require_protocol: true
        })
      },
      message: "g"
    },
  },
  owner: {
    required: true,
    type: mongoose.SchemaType.ObjectId,
    ref: "user",
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
  }
});

module.exports = mongoose.model('movie', movieSchema);