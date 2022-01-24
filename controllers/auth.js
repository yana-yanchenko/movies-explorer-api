const { NODE_ENV } = process.env;
const { SALT } = NODE_ENV === 'production' ? process.env : require('../config/config');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/сonflict-err');
const { getAccessToken } = require('./tokens');
const messages = require('../utils/messages');

module.exports.registerUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!email || !password || !name) {
    throw new BadRequestError(messages.err_data_register);
  }
  return bcrypt.hash(password, Number(SALT))
    .then((hash) => UserModel.create({
      name, email, password: hash,
    })
      .then((user) => {
        res.status(200).send({
          _id: user._id, email: user.email, name: user.name,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(messages.err_data_register));
        } else if (err.code === 11000) {
          next(new ConflictError(messages.err_conflict_register));
        } else {
          next(err);
        }
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      const token = getAccessToken(payload);
      res.send({
        token, _id: user._id, email: user.email, name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.err_data_login));
      } else {
        next(err);
      }
    });
};
