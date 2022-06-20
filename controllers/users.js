const User = require("../models/user");
const {
  ERROR_CODE_INTERNALERR,
  ERROR_CODE_BADREQUEST,
  ERROR_CODE_NOTFOUND,
} = require("../utils/errors");

// возвращаем всех юзеров
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(ERROR_CODE_INTERNALERR).send({ message: "Произошла ошибка" })
    );
};

// возвращем юзера по айди
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Пользователь не найден` });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res
          .status(ERROR_CODE_BADREQUEST)
          .send({ message: `Переданы некорректные данные` });
      } else {
        res
          .status(ERROR_CODE_INTERNALERR)
          .send({ message: "Произошла ошибка" });
      }
    });
};

// создаем юзера с именем и прочими штуками
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res
          .status(ERROR_CODE_BADREQUEST)
          .send({ message: `Переданы некорректные данные` });
      } else {
        res
          .status(ERROR_CODE_INTERNALERR)
          .send({ message: "Произошла ошибка" });
      }
    });
};

// обновления профиля - name & about
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Пользователь не найден` });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res
          .status(ERROR_CODE_BADREQUEST)
          .send({ message: `Переданы некорректные данные` });
      } else {
        res
          .status(ERROR_CODE_INTERNALERR)
          .send({ message: "Произошла ошибка" });
      }
    });
};

// обновление аватара
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Пользователь не найден` });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res
          .status(ERROR_CODE_BADREQUEST)
          .send({ message: `Переданы некорректные данные` });
      } else {
        res
          .status(ERROR_CODE_INTERNALERR)
          .send({ message: "Произошла ошибка" });
      }
    });
};
