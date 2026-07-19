const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dns.promises.resolveSrv("_mongodb._tcp.coderarmy.thi8ojy.mongodb.net")
    .then(console.log)
    .catch(console.error);