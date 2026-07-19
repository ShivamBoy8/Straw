
require("dotenv").config();

const main = require("./config/db");

const app = require('./app');
const redisClient = require("./config/redis");


const initialization = async () => {
    try {
         await Promise.all([redisClient.connect(),main()]);
        console.log("Redis and Database Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });

    } catch (err) {
        console.log(err);
    }
};

initialization();