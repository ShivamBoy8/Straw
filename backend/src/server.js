
require("dotenv").config();

const main = require("./config/db");

const app = require('./app');


const initialization = async () => {
    try {
        await main();
        console.log("Database Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });

    } catch (err) {
        console.log(err);
    }
};

initialization();