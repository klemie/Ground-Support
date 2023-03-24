import mongoose, { Document, Schema } from "mongoose";
import { FieldGroupSchema } from "./FieldGroupModel";

export interface IModule {
    name: String;

};

export interface IModuleModel extends IModule, Document { };

export const ModuleSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        FieldGroups: [FieldGroupSchema]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IModule>('Module', ModuleSchema);