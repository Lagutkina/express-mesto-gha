const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

// возвращаем всех юзеров
router.get("/", getUsers);

// возвращем юзера по айди
router.get("/:userId", getUserById);

// создаем юзера с именем и прочими штуками
router.post("/", createUser);

// обновления профиля - name & about
router.patch("/me", updateUser);

// обновление аватара
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
