const express = require("express");
const router = express.Router();

const { registerUser, getAllUsers, loginUser, logOut, forgotPassword, resetPassword, getUserDetail, changepassword, deleteUser, updateUserRole, updateProfile, getsingleuserdetail } = require("../controllers/userController.js");
const { isAuthenticated, isAdmin } = require("../Middleware/auth.js");

//Register New User
router.post("/register", registerUser);


//Login User
router.get("/login", loginUser);

//Reset Password email
router.post("/resetpassword", forgotPassword);

//Reset Password link
router.put("/password/reset/:resetToken", resetPassword);

//User Profile details
router.get("/me", isAuthenticated, getUserDetail);

//Change user password
router.put("/changepassword", isAuthenticated, changepassword);

//Change user details
router.put("/updateuserprofile", isAuthenticated, updateProfile);


//logout user
router.get("/logout", logOut);

// Get User Details
router.get("/admin/user/:id", isAuthenticated, isAdmin, getsingleuserdetail);

//Get all Users - admin
router.get("/admin/allusers", isAuthenticated, isAdmin, getAllUsers);

//change user role -- admin
router.put("/admin/user/changerole/:id", isAuthenticated, isAdmin, updateUserRole);

//Delete a user
router.delete("/admin/delete/:id", isAuthenticated, isAdmin, deleteUser);

module.exports = router;