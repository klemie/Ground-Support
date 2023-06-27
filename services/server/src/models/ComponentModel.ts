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

ComponentModel.pre<IComponentModel>('deleteOne', async function (next) {
    const componentId = this._id;
    try {
        // Remove component reference from Rockets
        await RocketModel.updateMany(
          { Components: componentId },
          { $pull: { Components: componentId } }
        );
        // console.log(`deleted Rocket`);
        // console.log(this.$model('Rocket'));
    
        // Remove component reference from Missions
        await MissionModel.updateMany(
          { Components: componentId },
          { $pull: { Components: componentId } }
        );
    
        next();
      } catch (error: any) {
        next(error);
      }
});

export default mongoose.model<IComponent>('Component', ComponentModel);