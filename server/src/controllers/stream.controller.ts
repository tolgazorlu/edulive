import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

import { v4 as uuidv4 } from 'uuid';
import { UserRequest } from '@stream-io/node-sdk';

const { client, call } = require("../config/stream")



/**
 * @route GET /v1/stream/user/:ocid
 * @desc Get User Stream Information
 */
export const getUserStreamInformation = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ ocid: req.params.ocid });
        if (!user) {
            return res.status(200).send(false)
        }
        return res.status(200).send(true)
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
        const newUserId = uuidv4()

        const user = await UserModel.findOne({ ocid: req.params.ocid })

        if (!user) {
            return res.status(400).json("User not found!")
        }

        const newUser: UserRequest = {
            id: newUserId,
            role: 'user',
            custom: {
                color: 'red',
            },
            name: user.name,
            image: user.avatar,
        };
        await client.upsertUsers([newUser]);

        const userToken = client.generateUserToken({ user_id: newUserId });

        const response = await call.getOrCreate({
            data: {
                created_by_id: newUserId,
                members: [{ user_id: newUserId, role: "host" }],
            },
        });

        return res.status(201).json({ "rtmpURL": response.call.ingress.rtmp.address, "streamKey": userToken })
    } catch (error: any) {
        return console.log(error)
    }
};

