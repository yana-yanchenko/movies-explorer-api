const { checkAccessToken } = require('../controllers/tokens');
const Unauthorized = require('../errors/unauthorized-err');
const messages = require('../utils/messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(messages.err_unauth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = checkAccessToken(token);
  } catch (err) {
    throw new Unauthorized(messages.err_unauth);
  }

  req.user = payload;

  return next();
};
