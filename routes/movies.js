const router = require('express').Router();
const { deleteMovieValid, createMovieValid } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValid, createMovie);
router.delete('/:movieId', deleteMovieValid, deleteMovie);

module.exports = router;
