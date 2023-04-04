import mongoose, { Document, Schema, Types } from "mongoose";
import { DataPointSchema } from "./DataPointModel";

export interface IFieldData {
    Name: string;
    Range: [number];
    ParentModuleName: Types.ObjectId;
    ParentFieldGroupName: Types.ObjectId;
    Units: string;
    Data: [typeof DataPointSchema];
};

export interface IFieldModel extends IFieldData, Document { };

export const FieldDataSchema: Schema = new Schema(
    {
        FieldName: {
            type: String,
            required: true
        },
        ParentModuleName: {
            type: Types.ObjectId,
            ref: 'Module'
        },
        ParentFieldGroupName: {
            type: Types.ObjectId,
            ref: 'FieldGroup'
        },
        Range: {
            type: [Number],
            required: true
        },
        Units: {
            type: String,
            required: true
        },
        Data: [DataPointSchema]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IFieldData>('Field', FieldDataSchema);