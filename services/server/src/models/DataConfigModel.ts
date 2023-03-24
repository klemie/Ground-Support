import mongoose, { Document, Schema, Types } from "mongoose";
import { ModuleSchema } from "./ModuleModel";

export interface IDataConfig {
    Modules: []
};

export interface IDataConfigModel extends IDataConfig, Document { };

export const DataConfigSchema: Schema = new Schema(
    {
        Modules: [ModuleSchema]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IDataConfig>('DataConfig', DataConfigSchema);