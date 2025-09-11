const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")

dotenv.config();
connectDB();

const app = express();

//Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Headers: ", req.headers);
  next();
});

// CORS config
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

//Test route
app.get("/", (req, res) => {
  res.send("Gym management API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
