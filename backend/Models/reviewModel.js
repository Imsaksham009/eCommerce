const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Review", reviewSchema);