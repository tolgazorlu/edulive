import mongoose, { Schema, Document, Model } from "mongoose";
import { IStream } from "./stream.model";

export enum Role {
    Teacher = "teacher",
    Learner = "learner",
}

interface IUser extends Document {
    ocid: string;
    name: string;
    email: string;
    job?: string;
    avatar: string;
    edu_address: string;
    role?: Role;
    streams: IStream[];
    followers: IUser[];
    following: IUser[];
}

const UserSchema: Schema = new Schema({
    ocid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    job: { type: String, default: "Teacher" },
    avatar: { type: String },
    edu_address: { type: String },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.Learner,
    },
    streams: [{ type: Schema.Types.ObjectId, ref: "Stream" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export { UserModel, IUser };
