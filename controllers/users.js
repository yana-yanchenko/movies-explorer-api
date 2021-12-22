const UserModel = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/сonflict-err');
const user = require('../models/user');


module.exports.updateUserMe = (req, res, next) => {
  if (!req.body) {
    throw new BadRequestError('400 — Переданы некорректные данные при обновлении профиля.');
  }
   UserModel.findById(req.user._id)
   .then(() => {
     if (!user) {
       next(new ConflictError(`Пользователь с таким  уже существует!`));
     } else {
      UserModel.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true })
      .orFail(() => new NotFoundError('404 — Пользователь по указанному _id не найден.'))
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        next(err);
      });
     }
   })
   .catch(() => {
    if (err.name === 'CastError') {
      next(new BadRequestError('400 — Переданы некорректные данные при обновлении профиля.'));
    } else if (err.code === 11000) {
      next(new ConflictError(`Пользователь с таким уже существует!`));
    } else {
      next(err);
    }
   })
};

module.exports.getUserMe = (req, res, next) => {
  UserModel.findById(req.user._id)
    .orFail(() => new NotFoundError('404 — Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('404 — Пользователь по указанному _id не найден.'));
      }
      next(err);
    });
};