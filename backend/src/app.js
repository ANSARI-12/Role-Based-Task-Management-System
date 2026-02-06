const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running well");
});

app.listen(port, () => {
  console.log(`Server run on Port : ${port} `);
});

module.exports = app;
