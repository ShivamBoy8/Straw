const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const authRoutes = require("./routes/authRoutes");
const productRoutes=require("./routes/productRoutes")

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "STRAW Backend Running "
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;