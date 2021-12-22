const router = require('express').Router();

const { updateUserMe, getUserMe } = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', updateUserMe);

module.exports = router;