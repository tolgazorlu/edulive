import mongoose from "mongoose";

const keys = require("../config/keys");
const { database } = keys;


const connectToDB = async () => {
    try {
        await mongoose
            .connect(database.url)
            .then(() => {
                console.log("Database Connected!");
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = connectToDB;
