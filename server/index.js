const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const contactRoute = require("./route/contactRoute");
const userRoute = require("./route/userRoute");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/connectDb");

const app = express();

connectDb();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to NexContact Application..!");
});
app.use("/api/contacts", contactRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
