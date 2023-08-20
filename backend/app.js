const express = require("express");

const app = express();

app.use(express.json());


app.use('/api/v1', require("./routes/productRoute"));


//error handler
app.use((err, req, res, next) => {
    if (!err.status) err.status = 404;
    if (!err.message) err.message = "Something Went Wrong";

    if (err.name === "CastError") {
        err.message = `Not Found!!! Invalid: ${err.path}`;
    }

    res.status(err.status).json({ success: false, message: err.message, errors: err.stack });
});

module.exports = app;