import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFieldData {
    Name: string;
    Range: [number];
    Units: string;
    ParentModuleName: Types.ObjectId;
    ParentFieldGroupName: Types.ObjectId;
    TelemetryId: Buffer;
    Data: [typeof DataPoint];
};

const DataPoint: Schema = new Schema(
    {
        Value: {
            type: Types.Decimal128,
            required: true,
            immutable: true
        },
        timeStamp: {
            type: Date,
            required: true,
            immutable: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export interface IFieldModel extends IFieldData, Document { };

export const FieldDataSchema: Schema = new Schema(
    {
        FieldName: {
            type: String,
            required: true
        },
        ParentModuleName: {
            type: Types.ObjectId,
            ref: 'Module',
            required: true
        },
        ParentFieldGroupName: {
            type: Types.ObjectId,
            ref: 'FieldGroup',
            required: true
        },
        Range: {
            type: [Number],
            required: true
        },
        Units: {
            type: String,
            required: true
        },
        TelemetryId: {
            type: Buffer,
            required: true
        },
        Data: [DataPoint]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IFieldData>('Field', FieldDataSchema);