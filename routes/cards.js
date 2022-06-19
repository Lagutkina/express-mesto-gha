const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// возвращаем все карточки
router.get("/", getCards);

// создаем карточку
router.post("/", createCard);

// удаляем карточку по айди
router.delete("/:cardId", deleteCard);

// ставим карточке лайк

router.put("/:cardId/likes", likeCard);

// удаляем карточке лайк
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
