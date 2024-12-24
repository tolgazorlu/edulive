"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const app = (0, express_1.default)();
const connectToDB = require("./config/database");
connectToDB();
// * MIDDLEWARES
const cors = require("cors");
app.use(cors({
    origin: [
        "http://localhost:5173",
    ],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// * ROUTES
const authRoute = require("./routes/auth.routes");
app.use("/v1/auth", authRoute);
const port = 8080;
app.listen(port, () => {
    console.log(`Port is running on ${port}`);
});
