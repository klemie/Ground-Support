import mongoose, { Document, Schema } from "mongoose";

enum TelemetrySource {
    lora = "LORA",
    aprs = "APRS"
}

export interface IComponent {
    Name: String;
    TelemetrySource: TelemetrySource;
    Details: String;
    DataConfig: Object;
};

export interface IComponentModel extends IComponent, Document { };

const ComponentModel: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        TelemetrySource: {
            type: String,
            enum: ['LoRa', 'APRS']
        },
        DataConfig: {
            type: Object
        },
        Details: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IComponent>('Component', ComponentModel);