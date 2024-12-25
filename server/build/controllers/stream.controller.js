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
exports.createStream = exports.getUserStreamInformation = void 0;
const user_model_1 = require("../models/user.model");
const uuid_1 = require("uuid");
const { client, call } = require("../config/stream");
/**
 * @route GET /v1/stream/user/:ocid
 * @desc Get User Stream Information
 */
const getUserStreamInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getUserStreamInformation = getUserStreamInformation;
/**
* @route GET /v1/stream/create
* @desc Create New Stream for User
*/
const createStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserId = (0, uuid_1.v4)();
        const user = yield user_model_1.UserModel.findOne({ ocid: req.params.ocid });
        if (!user) {
            return res.status(400).json("User not found!");
        }
        const newUser = {
            id: newUserId,
            role: 'user',
            custom: {
                color: 'red',
            },
            name: user.name,
            image: user.avatar,
        };
        yield client.upsertUsers([newUser]);
        const userToken = client.generateUserToken({ user_id: newUserId });
        const response = yield call.getOrCreate({
            data: {
                created_by_id: newUserId,
                members: [{ user_id: newUserId, role: "host" }],
            },
        });
        return res.status(201).json({ "rtmpURL": response.call.ingress.rtmp.address, "streamKey": userToken });
    }
    catch (error) {
        return console.log(error);
    }
});
exports.createStream = createStream;
