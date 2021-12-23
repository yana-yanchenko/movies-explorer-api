const PORT = 3000;
const DB = 'mongodb://localhost:27017/moviesdb';
const SECRET = 'syper-secret';
const SALT = '11';
const DB_OPTION = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
module.exports = {
  PORT,
  DB,
  SALT,
  SECRET,
  DB_OPTION,
};
