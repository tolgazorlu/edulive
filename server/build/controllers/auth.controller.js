"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserInformation = exports.getUserIsExist = void 0;
const user_model_1 = require("../models/user.model");
/**
 * @route GET /v1/auth/exist-user
 * @desc Get User Exist
 */
const getUserIsExist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ ocid: req.params.ocid });
        if (!user) {
            return res.status(200).send(false);
        }
        return res.status(200).send(true);
    }
    catch (error) {
        return console.log(error);
    }
});
exports.getUserIsExist = getUserIsExist;
/**
 * @route GET /v1/auth/exist-user
 * @desc Get User Exist
 */
const getUserInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ ocid: req.params.ocid });
        if (!user) {
            return res.status(400).send("Something went wrong!");
        }
        return res.status(200).send(user);
    }
    catch (error) {
        return console.log(error);
    }
});
exports.getUserInformation = getUserInformation;
/**
* @route GET /v1/auth/create
* @desc Create New User
*/
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ocid, name, email, edu_address, role } = req.body;
        const user = new user_model_1.UserModel({
            ocid,
            name,
            email,
            edu_address,
            role
        });
        yield user.save();
        if (!user) {
            return res.status(400).send("Something went wrong!");
        }
        return res.status(201).json("User created!");
    }
    catch (error) {
        return console.log(error);
    }
});
exports.createUser = createUser;
