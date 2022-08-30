const { Router } = require("express");
const router = Router();
const { genreController } = require("../controllers/genre.controllers");

router.post("/genre", genreController.postGenre);                    // добавление жанра
router.delete("/genre/:id", genreController.deleteGenre);           // удаление жанра
router.get("/genre", genreController.getGenre);                    // вывод всех жанров

module.exports = router;