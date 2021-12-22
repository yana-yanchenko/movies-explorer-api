const router = require('express').Router();

const { registerUser, login } = require('../controllers/auth');

router.post('/signup', registerUser);
router.post('/signin', login);

module.exports = router;