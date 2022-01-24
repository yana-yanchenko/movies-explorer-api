const router = require('express').Router();
const auth = require('../middlewares/auth');
const messages = require('../utils/messages');

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const NotFoundError = require('../errors/not-found-err');

router.use('/', authRoutes);
router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);
router.all('*', auth, () => { throw new NotFoundError(messages.err_default); });

module.exports = router;
