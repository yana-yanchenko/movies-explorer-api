const router = require('express').Router();

const auth = require('./auth');
const users = require('./users');
const movies = require('./movies');

router.use('/', auth);
router.use('/users', users);
router.use('/movies', movies);
router.all('*', () => {
  console.log('j');
})

module.exports = router;