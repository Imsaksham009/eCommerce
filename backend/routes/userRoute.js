const express = require("express");
const router = express.Router();

const { registerUser, getAllUsers, loginUser, logOut } = require("../controllers/userController.js");

router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.get("/login", loginUser);
router.get("/logout", logOut);


module.exports = router;