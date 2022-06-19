const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // JSON middelware

const users = require("./routes/users");
const cards = require("./routes/cards");

const { PORT = 3000 } = process.env;
const app = express(); // заводим сервер

mongoose.connect("mongodb://localhost:27017/mestodb"); // подключаемся к  БД

app.use(bodyParser.urlencoded({ extended: false })); // express понимает JSON запросы
app.use(bodyParser.json()); // express понимает JSON запросы

app.use((req, res, next) => {
  // захардкодили идентификатор пользователя
  req.user = {
    _id: "62aef27209512748ee2a73c8",
  };

  next();
});

app.use("/users", users); // подключение роута для users
app.use("/cards", cards); // подключение роута для cards

app.listen(PORT, () => {
  console.log("its a day ");
});
