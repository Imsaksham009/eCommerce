const mongoose = require("mongoose");

const connectDB = () => {

    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Database Connected");
        }).catch((e) => {
            console.error(e);
            console.log("Database error");
        });
};


module.exports = connectDB;