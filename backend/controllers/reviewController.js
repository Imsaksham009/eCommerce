const Review = require("../Models/reviewModel");
const Product = require("../Models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");

//Add review
exports.addReview = catchAsync(async (req, res, next) => {
    const { rating, comment } = req.body;
    const reviewBody = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    };
    let foundProduct = await Product.findById(req.params.id).populate("reviews");

    if (!foundProduct) {
        return next(new AppError("Product not found", 404));
    }

    const isReviewed = foundProduct.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        foundProduct.reviews.forEach(async (rev, index) => {
            if (rev.user.toString() === req.user._id.toString()) {
                console.log(index);
                const review = await Review.findByIdAndUpdate(rev.id, reviewBody, { new: true, runValidators: true });
                foundProduct.reviews[index] = review;
                if (!review) return next(new AppError("Review Not Found", 404));
            }
        });
    } else {
        const review = new Review(reviewBody);
        foundProduct.reviews.push(review);
        foundProduct.numOfReviews = foundProduct.reviews.length;
        await review.save();
    }

    let totalRating = 0;

    foundProduct.reviews.forEach((rev) => {
        totalRating += rev.rating;
    });

    foundProduct.ratings = totalRating / foundProduct.numOfReviews;

    await foundProduct.save({ new: true, runValidators: true });

    res.status(200).json({ success: true, message: "Review Done" });

});

exports.deleteReview = catchAsync(async (req, res, next) => {
    let foundProduct = await Product.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewid } }, { new: true }).populate("reviews");

    if (!foundProduct) {
        return next(new AppError("Product not found", 404));
    }

    const review = await Review.findByIdAndDelete(req.params.reviewid);

    if (!review) return next(new AppError("Review not found", 404));

    foundProduct.numOfReviews = foundProduct.reviews.length;


    let totalRating = 0;

    foundProduct.reviews.forEach((rev) => {
        totalRating += rev.rating;
    });

    if (foundProduct.numOfReviews === 0) foundProduct.ratings = 0;
    else foundProduct.ratings = (totalRating / foundProduct.numOfReviews);


    foundProduct = await foundProduct.save({ new: true });

    res.status(200).json({ status: false, message: "Review Deleted", foundProduct });

});