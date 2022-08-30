const { Router } = require("express");
const router = Router();
const {booksController} = require("../controllers/book.controllers")

router.get("/books", booksController.getBooks)
router.get("/books/genre", booksController.getBooksGenre)
router.post("/books",booksController.addBooks)
router.get("/books/:id",booksController.getBooksID)
router.delete("/admin/books/:id", booksController.deleteBooks)

module.exports = router;
