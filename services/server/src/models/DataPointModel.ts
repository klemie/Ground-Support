import mongoose, { Document, Schema } from "mongoose";

export interface IDataPoint {
    Value: Number;
};

export interface IDataPointModel extends IDataPoint, Document { };

export const DataPointSchema: Schema = new Schema(
    {
        Value: {
            type: Number,
            required: true,
            immutable: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IDataPoint>('DataPoint', DataPointSchema);