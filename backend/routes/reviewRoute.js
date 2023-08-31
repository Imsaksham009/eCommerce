const express = require("express");
const { addReview, deleteReview } = require("../controllers/reviewController.js");
const { isAuthenticated, isReviewAuthor } = require("../Middleware/auth");
const router = express.Router({ mergeParams: true });

//review add route
router.post("/", isAuthenticated, addReview);

//delete review
router.delete("/delete/:reviewid", isAuthenticated, isReviewAuthor, deleteReview);


module.exports = router;
