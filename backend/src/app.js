const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const authRoutes = require("./routes/authRoutes");
const productRoutes=require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const aiRoutes = require("./routes/aiRoutes");

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
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;