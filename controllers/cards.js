const Card = require("../models/card");

const {
  ERROR_CODE_INTERNALERR,
  ERROR_CODE_BADREQUEST,
  ERROR_CODE_NOTFOUND,
} = require("../errors");

// возвращаем все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) =>
      res
        .status(ERROR_CODE_INTERNALERR)
        .send({ message: `Произошла ошибка ${err}` })
    );
};

// создаем карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }) // добавляем айди оунера
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res
          .status(ERROR_CODE_BADREQUEST)
          .send({ message: `Переданы некорректные данные` });
      } else {
        res
          .status(ERROR_CODE_INTERNALERR)
          .send({ message: `Произошла ошибка ${err}` });
      }
    });
};

// удаляем карточку по айди
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Карточка не найдена` });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      res
        .status(ERROR_CODE_INTERNALERR)
        .send({ message: `Произошла ошибка ${err}` });
    });
};

// ставим карточке лайк
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Карточка не найдена` });
      } else {
        res.send(card);
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
          .send({ message: `Произошла ошибка ${err}` });
      }
    });
};
// удаляем карточке лайк
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать айди из множества
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Карточка не найдена` });
      } else {
        res.send(card);
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
          .send({ message: `Произошла ошибка ${err}` });
      }
    });
};
