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
    avatar: string;
    edu_address: string;
    role?: Role;
    streams: IStream[];
}

const UserSchema: Schema = new Schema({
    ocid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    edu_address: { type: String },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.Learner,
    },
    streams: [{ type: Schema.Types.ObjectId, ref: "Stream" }],
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export { UserModel, IUser };
