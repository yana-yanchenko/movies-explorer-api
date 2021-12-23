const router = require('express').Router();
const { updateUserValid } = require('../middlewares/validation');
const { updateUserMe, getUserMe } = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', updateUserValid, updateUserMe);

module.exports = router;
