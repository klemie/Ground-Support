import mongoose, { Document, Schema, Types } from "mongoose";

export interface IDataPoint {
    FieldName: string;
    FieldId: string;
    Value: number;
    TimeSinceLaunch: number;
};

export const DataPointSchema: Schema = new Schema(
    {
        FieldName: String,
        FieldId: {
            type: Types.ObjectId,
            ref: 'Field'
        },
        Value: {
            type: Types.Decimal128,
            immutable: true
        },
        TimeSinceLaunch: {
            type: Number,
            immutable: true
        },
        PacketNumber: Number
    },
    {
        versionKey: false,
        timestamps: true
    }
);