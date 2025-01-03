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
exports.updateStreamStatus = exports.getActiveStreams = exports.createStream = exports.getStream = void 0;
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
        const stream = yield stream_model_1.StreamModel.findOne({ slug }).populate("owner");
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
        const username = user.ocid.split(".")[1];
        const newUser = {
            id: username,
            role: 'user',
            custom: {
                color: 'red',
            },
            name: user.name,
            image: user.avatar,
        };
        yield client.upsertUsers([newUser]);
        const userToken = client.generateUserToken({ user_id: username });
        const response = yield call.getOrCreate({
            data: {
                created_by_id: username,
                members: [{ user_id: username, role: "host" }],
            },
        });
        console.log(response);
        const callId = response.call.id;
        const viewerToken = client.generateCallToken({ user_id: username });
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
            callId: callId,
            isLive: true
        });
        yield newStream.save();
        return res.status(201).json(newStream);
    }
    catch (error) {
        return console.log(error);
    }
});
exports.createStream = createStream;
/**
 * @route GET /v1/stream/active
 * @desc Get all active and past streams
 */
const getActiveStreams = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get live streams
        const liveStreams = yield stream_model_1.StreamModel.find({ isLive: true })
            .populate("owner")
            .sort({ createdAt: -1 });
        // Get past streams
        const pastStreams = yield stream_model_1.StreamModel.find({ isLive: false })
            .populate("owner")
            .sort({ createdAt: -1 })
            .limit(10); // Limit to last 10 streams
        return res.status(200).json({
            liveStreams,
            pastStreams
        });
    }
    catch (error) {
        console.error("Error fetching streams:", error);
        return res.status(500).json({ error: "Failed to fetch streams" });
    }
});
exports.getActiveStreams = getActiveStreams;
/**
 * @route PATCH /v1/stream/:id/status
 * @desc Update stream live status
 */
const updateStreamStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isLive } = req.body;
        const stream = yield stream_model_1.StreamModel.findByIdAndUpdate(id, { isLive }, { new: true });
        if (!stream) {
            return res.status(404).json({ error: "Stream not found" });
        }
        return res.status(200).json(stream);
    }
    catch (error) {
        console.error("Error updating stream status:", error);
        return res.status(500).json({ error: "Failed to update stream status" });
    }
});
exports.updateStreamStatus = updateStreamStatus;
