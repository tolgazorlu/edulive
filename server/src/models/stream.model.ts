import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./user.model";

interface IStream extends Document {
    title: string;
    description: string;
    slug: string;
    rtmpURL: string;
    streamKey: string;
    owner: IUser;
    viewerToken: string;
    callId: string
}

const StreamSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String },
    rtmpURL: { type: String },
    streamKey: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    viewerToken: { type: String },
    callId: { type: String },
    isLive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const StreamModel: Model<IStream> = mongoose.model<IStream>("Stream", StreamSchema);

export { StreamModel, IStream };
