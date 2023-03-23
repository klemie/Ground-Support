import mongoose, { Document, Schema, Types } from "mongoose";
import FieldModel from "./FieldModel";

export interface IFieldGroup {
    Name: String;
    FieldIds: [];
};

export interface IFieldGroupModel extends IFieldGroup, Document { };

export const FieldGroupSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        FieldIds: [FieldModel]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IFieldGroup>('Field Group', FieldGroupSchema);