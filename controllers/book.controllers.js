const Book = require("../models/Book.model");

module.exports.booksController = {
  getBooks: async (req, res) => {
    const data = await Book.find({});
    res.json(data);
  },
  addBooks: async (req, res) => {
   try {
    const { name, genre, rentedUsers, author } = req.body;
    await Book.create({
      name,
      genre,
      rentedUsers,
      author,
    });
    res.json("Добавлена книга");
   } catch (error) {
    return res.status(400).json(e.toString())
   }
  },
  deleteBooks: async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json("Книга удалена");
  },
  getBooksGenre: async (req, res) => {
    const data = await Book.find({ genre: req.body.genre });
    res.json(data);
  },
  getBooksID: async (req, res) => {
    const data = await Book.findById(req.params.id);
    res.json(data);
  },
};
