const app = require("./app");
const connectDB = require("./Database/dbConnect");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

process.on("uncaughtException", (err) => {
    console.log(err.message);
    process.exit(1);
});

const PORT = process.env.PORT;

//connect DataBase
connectDB();



const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Go on http://localhost:${PORT}`);
});


//error handler for rejections
process.on("unhandledRejection", (err) => {
    console.log(err.message);
    server.close(() => {
        process.exit(1);
    });
});