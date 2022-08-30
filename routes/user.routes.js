const { Router } = require("express");
const { usersController } = require("../controllers/users.controllers");
const router = Router();

router.post("/users", usersController.addUser);
router.delete("/users", usersController.deleteUser);
router.get("/users", usersController.getUsers);
router.patch("/users/:id", usersController.rentBooksUser);
router.patch("/books/:userId/remove", usersController.takeBook);

module.exports = router;
