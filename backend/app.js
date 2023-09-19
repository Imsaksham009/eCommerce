const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', require("./routes/productRoute"));
app.use('/api/v1/product/:id/review', require("./routes/reviewRoute"));
app.use('/api/v1/user', require("./routes/userRoute.js"));
app.use('/api/v1/order', require("./routes/orderRoute"));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//error handler
app.use((err, req, res, next) => {
    if (!err.status) err.status = 404;
    if (!err.message) err.message = "Something Went Wrong";

    if (err.name === "CastError") {
        err.message = `Not Found!!! Invalid: ${err.path}`;
    }
    if (err.name === "JsonWebTokenError") {
        err.message = `Token is invalid`;
    }
    if (err.code === 11000) {
        err.message = `User with email ${err.keyValue.email} already exists`;
    }

    res.status(err.status).json({ success: false, message: err.message });
});

module.exports = app;