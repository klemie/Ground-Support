import mongoose, { Document, Schema } from "mongoose";

export interface IGeneric {
    name: String;
};

export interface IGenericModel extends IGeneric, Document { };

const GenericSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IGeneric>('Generic', GenericSchema);