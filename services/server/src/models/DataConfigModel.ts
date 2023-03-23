import mongoose, { Document, Schema, Types } from "mongoose";
import { FieldGroupSchema } from "./FieldGroupModel";

export interface IDataConfig {
    FieldGroups: []
};

export interface IDataConfigModel extends IDataConfig, Document { };

const DataConfigSchema: Schema = new Schema(
    {
        FieldGroups: [FieldGroupSchema]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IDataConfig>('DataConfig', DataConfigSchema);