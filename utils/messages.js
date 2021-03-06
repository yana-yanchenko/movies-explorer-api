const messages = {
  err_data_register: 'Переданы некорректные данные при регистрации пользователя!',
  err_conflict_register: 'Пользователь с таким email уже существует!',
  err_data_login: 'Переданы некорректные данные при попытке входа в аккаунт!',
  err_data_create_movie: 'Переданы некорректные данные при попытке создания фильма!',
  err_delete_movie: 'Переданы некорректные данные при попытке удаления фильма!',
  err_conflict_delete_movie: 'Фильм пренадлежит другому пользователю. Удаление не возможно!',
  delete_movie_ok: 'Фильм удален успешно!',
  err_data_user: 'Переданы некорректные данные при обновлении профиля!',
  err_data_id_user: 'Пользователь по указанному _id не найден!',
  err_unauth: 'Необходима авторизация!',
  err_default: 'Что-то пошло не так!',
  err_valid_url: 'Адрес не валиден!',
  err_valid_email: 'Email не валиден!',
};

module.exports = messages;
