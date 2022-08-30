const User = require("../models/User.model");
const Book = require("../models/Book.model");

module.exports.usersController = {
  addUser: async (req, res) => {
    const { name, rent } = req.body;
    try {
      await User.create({
        name,
        rent,
      });
      res.json("Пользователь добавлен");
    } catch (error) {
      res.json("Ошибка при добавлении пользователя");
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

    if (user.isBlocked) {
      return res.json("Вы заблокированы");
    }
    if (book.RentedUsers !== undefined) {
      return res.json("Книга уже арендована другим пользователем");
    }
    if (user.rent.length > 2) {
      return res.json("нельзя арендовать больше 3-х книг одновременно");
    }

    try {
      await user.updateOne({ $addToSet: { rent: book._id } });
      await book.updateOne({ $addToSet: { RentedUsers: user._id } });
      res.json("Книга арендована");
    } catch (error) {
      res.json("Ошибка при аренде");
    }
  },

  //Вернуть книгу

  takeBook: async (req, res) => {
    const { rentBooks } = req.body;
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: {
          rentBooks,
        },
      });
      await Book.findByIdAndUpdate(req.body.book, {
        $pull: { inRent: req.params.userId },
      });
      res.json("Книга удалена");
    } catch (err) {
      res.json(err);
    }
  },
};
