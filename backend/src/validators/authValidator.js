const validator = require("validator");

const validateUser = ({ name, email, password }) => {
    if (!name || name.trim().length < 3) {
        throw new Error("Name must be at least 3 characters");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid Email");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error(
            "Password must contain uppercase, lowercase, number and special character"
        );
    }
};

module.exports = validateUser;