import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./user.model";

interface IStream extends Document {
    title: string;
    description: string;
    slug: string;
    streamURL: string;
    streamKey: string;
    owner: IUser
}

const StreamSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String },
    streamURL: { type: String },
    streamKey: { type: String },
    owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const StreamModel: Model<IStream> = mongoose.model<IStream>("Stream", StreamSchema);

export { StreamModel, IStream };
