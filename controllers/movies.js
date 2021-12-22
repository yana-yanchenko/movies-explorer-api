const movieModel = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/сonflict-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  movieModel.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director,
    duration, year,
    description, image,
    trailer, nameRU,
    nameEN, thumbnail,
    movieId,
  } = req.body;

  MovieModel.create({
    owner: req.user.id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('400 — Переданы некорректные данные при создании карточки.'));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  MovieModel.findById(movieId)
    .orFail(() => new BadRequestError('400 — Переданы некорректные данные при обновлении профиля.'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Карточка вам не пренадлежит!');
      }
      MovieModel.findByIdAndRemove(movieId)
        .then(() => res.send('y'))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('400 — Переданы некорректные данные для удаления карточки'));
      }
      next(err);
    });
};