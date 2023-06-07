import mongoose, { Document, Schema, Types } from "mongoose";

import ModuleModel from "./ModuleModel";

export interface IField {
    Name: string;
    Range: [number];
    Units: string;
    TelemetryId: Buffer;
};

export interface IFieldModel extends IField, Document { };

export const FieldSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        TelemetryId: {
            type: Buffer,
            required: true
        },
        Range: {
            type: [Number],
            required: true
        },
        Units: {
            type: String,
            required: true,

        }
    },
    {
        versionKey: false,
        timestamps: false
    }
);

export default mongoose.model<IField>('Field', FieldSchema);