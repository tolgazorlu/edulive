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
exports.createStream = exports.getStream = void 0;
const user_model_1 = require("../models/user.model");
const slugify = require('slugify');
const stream_model_1 = require("../models/stream.model");
const { client, call } = require("../config/stream");
/**
 * @route GET /v1/stream/user/:ocid
 * @desc Get User Stream Information
 */
// export const getUserStreamInformation = async (req: Request, res: Response) => {
//     try {
//         const user = await UserModel.findOne({ ocid: req.params.ocid });
//         if (!user) {
//             return res.status(200).send(false)
//         }
//         return res.status(200).send(true)
//     } catch (error: any) {
//         return console.log(error)
//     }
// };
/**
 * @route GET /v1/stream/:slug
 * @desc Get Stream
 */
const getStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const stream = yield stream_model_1.StreamModel.findOne({ slug });
        if (!stream) {
            return res.status(200).send("User not found!");
        }
        return res.status(200).send(stream);
    }
    catch (error) {
        return console.log(error);
    }
});
exports.getStream = getStream;
/**
* @route GET /v1/stream/create
* @desc Create New Stream for User
*/
const createStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ ocid: req.params.ocid });
        if (!user) {
            return res.status(400).json("User not found!");
        }
        const newUser = {
            id: "tolga",
            role: 'user',
            custom: {
                color: 'red',
            },
            name: user.name,
            image: user.avatar,
        };
        yield client.upsertUsers([newUser]);
        const userToken = client.generateUserToken({ user_id: "tolga" });
        const response = yield call.getOrCreate({
            data: {
                created_by_id: "tolga",
                members: [{ user_id: "tolga", role: "host" }],
            },
        });
        console.log(response);
        const callId = response.call.id;
        const viewerToken = client.generateCallToken({ user_id: "tolga" });
        const newSlug = slugify(req.body.title, {
            replacement: '-',
            lower: true,
        });
        const newStream = new stream_model_1.StreamModel({
            title: req.body.title,
            description: req.body.description,
            slug: newSlug,
            rtmpURL: response.call.ingress.rtmp.address,
            streamKey: userToken,
            owner: user,
            viewerToken: viewerToken,
            callId: callId
        });
        yield newStream.save();
        return res.status(201).json(newStream);
    }
    catch (error) {
        return console.log(error);
    }
});
exports.createStream = createStream;
