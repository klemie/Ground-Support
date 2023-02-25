import mongoose, { Document, Schema } from "mongoose";

export interface IDataConfig {
    Name: String;
};

export interface IDataConfigModel extends IDataConfig, Document { };

const DataConfigSchema: Schema = new Schema(
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

export default mongoose.model<IDataConfig>('Generic', DataConfigSchema);