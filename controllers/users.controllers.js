const User = require("../models/User.model");
const Book = require("../models/Book.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  addUser: async (req, res) => {
    try {
      const { login, password } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user = await User.create({ login: login, password: hash });

      res.json(user);
    } catch (e) {
      res.json({ error: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res.status(401).json("Неверный логин");
        // return res.status(401).json({ error: "Неверный логин" });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json("неверный пароль");
      }
      const payload = {
        id: candidate._id,
      };
      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      res.json(token);
    } catch (e) {
      res.json({ error: e });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json("Пользователь удален");
    } catch (error) {
      res.json("Ошибка при удалении пользователя");
    }
  },

  getUsers: async (req, res) => {
    try {
      const usersData = await User.find();
      res.json(usersData);
    } catch (error) {
      res.json("Ошибка при выводе пользователей");
    }
  },

  //User interface

  rentBooksUser: async (req, res) => {
    const user = await User.findById(req.params.id);
    const book = await Book.findById(req.body.rent);

    if (book.rentedUsers.length !== 0) {
      return res.json("Книга уже арендована другим пользователем");
    }
    if (user.rent.length > 2) {
      return res.json("нельзя арендовать больше 3-х книг одновременно");
    }

    try {
      await user.updateOne({ $addToSet: { rent: book._id } });
      await book.updateOne({ $addToSet: { rentedUsers: user._id } });
      res.json("Книга арендована");
    } catch (error) {
      res.json("Ошибка при аренде");
    }
  },

  //Вернуть книгу

  takeBook: async (req, res) => {
    const { rent } = req.body;
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: {
          rent,
        },
      });
      await Book.findByIdAndUpdate(req.body.book, {
        $pull: { rentedUsers: req.params.userId },
      });
      res.json("Книга удалена");
    } catch (err) {
      res.json(err);
    }
  },
};
