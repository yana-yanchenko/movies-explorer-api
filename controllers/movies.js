const MovieModel = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const messages = require('../utils/messages');

module.exports.getMovies = (req, res, next) => {
  MovieModel.find({ owner: req.user._id })
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
    owner: req.user._id,
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
        next(new BadRequestError(messages.err_data_create_movie));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  MovieModel.findById(movieId)
    .orFail(() => new BadRequestError(messages.err_delete_movie))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(messages.err_conflict_delete_movie);
      }
      MovieModel.findByIdAndRemove(movieId)
        .then(() => res.send({ message: messages.delete_movie_ok }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.err_delete_movie));
      } else {
        next(err);
      }
    });
};
