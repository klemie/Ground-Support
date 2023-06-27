import mongoose, { Document, Schema, Types } from "mongoose";
import { DataConfigSchema } from "./DataConfigModel";
import MissionModel from "./MissionModel";
import RocketModel from "./RocketModel";

enum TelemetrySource {
    lora = "LORA",
    aprs = "APRS"
};

export interface IComponent {
    Name: string;
    TelemetrySource: TelemetrySource;
    Details: string;
    DataConfig: typeof DataConfigSchema;
};

export interface IComponentModel extends IComponent, Document { };

const ComponentModel: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Details: {
            type: String,
            required: true
        },
        TelemetrySource: {
            type: String,
            required: false
        },
        DataConfigId: {
            type: Types.ObjectId, 
            ref: 'DataConfig',
            required: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

ComponentModel.pre('findOneAndDelete', async function (next) {
    const component = this;
    const id = component.getFilter()["_id"];
    try {
        console.log("Deleting component: " + id);
        // await MissionModel.deleteMany({ $unset : { Components : id} });
        await RocketModel.updateMany(
            {_id: id },
            { $pull: { Components: id } },
            { multi: true },
            next
        );
    }
    catch (error) {
        console.log(error);
    }
    next();
});

export default mongoose.model<IComponent>('Component', ComponentModel);