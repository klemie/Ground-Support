import mongoose, { Document, Schema } from "mongoose";

export interface ITelemetryData {
    Type: string;
    Data: object;
};

export interface ITelemetryDataModel extends ITelemetryData, Document { };

const TelemetryDataSchema: Schema = new Schema(
    {
        Type: {
            type: String,
            enum: ['LoRa', 'APRS'],
            required: true,
            immutable: true
        },
        Data: {
            type: Object,
            required: true,
            immutable: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<ITelemetryData>('TelemetryData', TelemetryDataSchema);