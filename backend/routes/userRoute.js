const express = require("express");
const router = express.Router();

const { registerUser, getAllUsers, loginUser, logOut, forgotPassword, resetPassword } = require("../controllers/userController.js");

router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.get("/login", loginUser);
router.post("/resetpassword", forgotPassword);
router.put("/password/reset/:resetToken", resetPassword);
router.get("/logout", logOut);


module.exports = router;