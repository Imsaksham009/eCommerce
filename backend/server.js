const app = require("./app");
const connectDB = require("./Database/dbConnect");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });
const PORT = process.env.PORT;

//connect DataBase
connectDB();



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Go on http://localhost:${PORT}`);
});