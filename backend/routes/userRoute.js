const express = require("express");
const router = express.Router();

const { registerUser, getAllUsers, loginUser, logOut, forgotPassword, resetPassword, getUserDetail, changepassword } = require("../controllers/userController.js");
const { isAuthenticated } = require("../Middleware/auth.js");

router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.get("/login", loginUser);
router.post("/resetpassword", forgotPassword);
router.put("/password/reset/:resetToken", resetPassword);

router.get("/me", isAuthenticated, getUserDetail);
router.put("/changepassword", isAuthenticated, changepassword);
router.get("/logout", logOut);


module.exports = router;