const mongoose = require("mongoose");
const Review = require("./reviewModel");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        maxLength: [7, "Price can not be greater than 7 figures"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter the Category of the product"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter the stock of product"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Review"
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

productSchema.post("findOneAndDelete", async (d) => {
    if (d) {
        await Review.deleteMany({
            _id: {
                $in: d.reviews,
            },
        }).catch((e) => {
            console.log(e);
        });
    }
});

module.exports = mongoose.model("Product", productSchema);