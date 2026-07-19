const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "STRAW Backend Running "
    });
});

app.use("/api/auth", authRoutes);

module.exports = app;