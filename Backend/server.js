const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const authRouter = require("./routes/auth");
const adminRouter = require("./routes/Admin");
const cookieParser = require("cookie-parser");

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

const url = process.env.MONGODB_URI;
mongoose
  .connect(url, {
    dbName: "Dayskee",
  })
  .then(() => console.log("Database is connected"))
  .catch((e) => console.log(e));

const port = process.env.PORT || 8000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
