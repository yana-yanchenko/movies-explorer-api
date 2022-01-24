const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const messages = require('../utils/messages');
const Unauthorized = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      messages: messages.err_valid_email,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function compare(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(messages.err_data_login);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(messages.err_data_login);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
