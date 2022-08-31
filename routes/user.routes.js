const userMiddleware = require("../middlewares/user.middleware");

const { Router } = require("express");
const { usersController } = require("../controllers/users.controllers");
const router = Router();

router.post("/users/auth", usersController.addUser);
router.post("/users/login", usersController.login);
router.delete("/users", usersController.deleteUser);
router.get("/users", usersController.getUsers);
router.get("/users/:id", usersController.getUsersid);
router.patch("/users/avatar/:id",usersController.patchavatar);
router.patch("/users/:id",userMiddleware ,usersController.rentBooksUser);
router.patch("/users/:userId/remove", userMiddleware, usersController.takeBook);

module.exports = router;
