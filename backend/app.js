const express = require("express");

const app = express();

app.use(express.json());


app.use('/api/v1', require("./routes/productRoute"));


//error handler
app.use((err, req, res, next) => {
    if (!err.status) err.status = 404;
    res.status(err.status).json({ success: false, message: err.message, errors: err.stack });
});

module.exports = app;