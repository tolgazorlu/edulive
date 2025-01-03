import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
const slugify = require('slugify')
import { v4 as uuidv4 } from 'uuid';
import { UserRequest } from '@stream-io/node-sdk';
import { StreamModel } from '../models/stream.model';

const { client, call } = require("../config/stream")



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
export const getStream = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params
        const stream = await StreamModel.findOne({ slug }).populate("owner");
        if (!stream) {
            return res.status(200).send("User not found!")
        }
        return res.status(200).send(stream)
    } catch (error: any) {
        return console.log(error)
    }
};


/**
* @route GET /v1/stream/create
* @desc Create New Stream for User
*/
export const createStream = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ ocid: req.params.ocid })
        if (!user) {
            return res.status(400).json("User not found!")
        }

        const newUser: UserRequest = {
            id: "tolga",
            role: 'user',
            custom: {
                color: 'red',
            },
            name: user.name,
            image: user.avatar,
        };

        await client.upsertUsers([newUser]);

        const userToken = client.generateUserToken({ user_id: "tolga" });

        const response = await call.getOrCreate({
            data: {
                created_by_id: "tolga",
                members: [{ user_id: "tolga", role: "host" }],
            },
        });

        console.log(response)

        const callId = response.call.id;
        const viewerToken = client.generateCallToken({ user_id: "tolga" });


        const newSlug = slugify(req.body.title, {
            replacement: '-',
            lower: true,
        })

        const newStream = new StreamModel({
            title: req.body.title,
            description: req.body.description,
            slug: newSlug,
            rtmpURL: response.call.ingress.rtmp.address,
            streamKey: userToken,
            owner: user,
            viewerToken: viewerToken,
            callId: callId,
            isLive: true
        })

        await newStream.save()

        return res.status(201).json(newStream)
    } catch (error: any) {
        return console.log(error)
    }
};


/**
 * @route GET /v1/stream/active
 * @desc Get all active and past streams
 */
export const getActiveStreams = async (_req: Request, res: Response) => {
    try {
        // Get live streams
        const liveStreams = await StreamModel.find({ isLive: true })
            .populate("owner")
            .sort({ createdAt: -1 });

        // Get past streams
        const pastStreams = await StreamModel.find({ isLive: false })
            .populate("owner")
            .sort({ createdAt: -1 })
            .limit(10); // Limit to last 10 streams

        return res.status(200).json({
            liveStreams,
            pastStreams
        });
    } catch (error) {
        console.error("Error fetching streams:", error);
        return res.status(500).json({ error: "Failed to fetch streams" });
    }
};


/**
 * @route PATCH /v1/stream/:id/status
 * @desc Update stream live status
 */
export const updateStreamStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isLive } = req.body;

        const stream = await StreamModel.findByIdAndUpdate(
            id,
            { isLive },
            { new: true }
        );

        if (!stream) {
            return res.status(404).json({ error: "Stream not found" });
        }

        return res.status(200).json(stream);
    } catch (error) {
        console.error("Error updating stream status:", error);
        return res.status(500).json({ error: "Failed to update stream status" });
    }
};

