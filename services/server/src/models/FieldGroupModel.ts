import mongoose, { Document, Schema, Types } from "mongoose";
import { FieldSchema } from "./FieldModel";

export interface IFieldGroup {
    Name: String;
    Fields: [];
};

export interface IFieldGroupModel extends IFieldGroup, Document { };

export const FieldGroupSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Fields: [FieldSchema]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IFieldGroup>('Field Group', FieldGroupSchema);