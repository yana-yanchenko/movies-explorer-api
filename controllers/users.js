const UserModel = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/сonflict-err');
const messages = require('../utils/messages');
const NotFoundError = require('../errors/not-found-err');

module.exports.updateUserMe = (req, res, next) => {
  if (!req.body) {
    throw new BadRequestError(messages.err_data_user);
  }
  const { email } = req.body;
  UserModel.findOne({ email })
    .then((data) => {
      if (data) {
        next(new ConflictError(messages.err_conflict_register));
      } else {
        UserModel.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true })
          .orFail(() => new NotFoundError(messages.err_data_id_user))
          .then((user) => {
            res.status(200).send(user);
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.err_data_user));
      } else if (err.code === 11000) {
        next(new ConflictError(messages.err_conflict_register));
      } else {
        next(err);
      }
    });
};

module.exports.getUserMe = (req, res, next) => {
  UserModel.findById(req.user._id)
    .orFail(() => new NotFoundError(messages.err_data_id_user))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(messages.err_data_id_user));
      } else {
        next(err);
      }
    });
};
