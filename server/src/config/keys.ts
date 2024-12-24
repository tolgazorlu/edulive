require("dotenv").config();

module.exports = {
    app: {
        name: "Oned Techs API",
    },
    port: process.env.PORT || 8080,
    database: {
        url: process.env.MONGO_URI,
    },
};