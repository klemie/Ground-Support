import mongoose, { Document, Schema, Types } from "mongoose";
import { DataPointSchema } from "./DataPointModel";
export interface IField {
    Name: string;
    Range: Array<number>;
    Data: [];
};

export interface IGenericModel extends IField, Document { };

export const FieldSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Range: {
            type: Array<Number>,
            required: true
        },
        Units: {
            type: String,
            required: true,

        },
        Data: [DataPointSchema]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IField>('Field', FieldSchema);