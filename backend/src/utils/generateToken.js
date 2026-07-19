const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {

    const token = jwt.sign(
        { userId },
        process.env.JWT_KEY,
        {
            expiresIn: "30d"
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return token;
};

module.exports = generateTokenAndSetCookie;