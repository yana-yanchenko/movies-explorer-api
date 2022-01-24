const router = require('express').Router();
const { registerValid, loginValid } = require('../middlewares/validation');

const { registerUser, login } = require('../controllers/auth');

router.post('/signup', registerValid, registerUser);
router.post('/signin', loginValid, login);

module.exports = router;
