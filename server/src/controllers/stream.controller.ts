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
            callId: callId
        })

        await newStream.save()

        return res.status(201).json(newStream)
    } catch (error: any) {
        return console.log(error)
    }
};

