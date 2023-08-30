const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', require("./routes/productRoute"));
app.use('/api/v1/user', require("./routes/userRoute.js"));


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