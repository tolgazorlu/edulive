import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

/**
 * @route GET /v1/auth/exist-user
 * @desc Get User Exist
 */
export const getUserIsExist = async (req: Request, res: Response) => {
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
 * @route GET /v1/auth/exist-user
 * @desc Get User Exist
 */
export const getUserInformation = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ ocid: req.params.ocid });
        if (!user) {
            return res.status(400).send("Something went wrong!")
        }
        return res.status(200).send(user)
    } catch (error: any) {
        return console.log(error)
    }
};

/**
* @route GET /v1/auth/create
* @desc Create New User
*/
export const createUser = async (req: Request, res: Response) => {
    try {

        const { ocid, name, email, edu_address, role } = req.body
        const user = new UserModel({
            ocid,
            name,
            email,
            edu_address,
            role
        })

        await user.save()
        if (!user) {
            return res.status(400).send("Something went wrong!")
        }

        return res.status(201).json("User created!")
    } catch (error: any) {
        return console.log(error)
    }
};

