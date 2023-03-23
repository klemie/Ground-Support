import mongoose, { Document, Schema, Types } from "mongoose";
import { isValidCoordinates } from "../library/CoordinateValidation";

export interface IMission {
    Name: string;
    DataConfig: [];
    Published: boolean;
    IsTest: boolean;
    Date: Date
    Coordinates: [];
};

export interface IMissionModel extends IMission, Document { };

const MissionSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        IsTest: {
            type: Boolean,
            required: true
        },
        Date: {
            type: Date,
            required: true
        },
        Coordinates: {
            type: [],
            require: true,
            validator: (cs: Array<number>) => {
                return isValidCoordinates(cs[0], cs[1]);
            }
        },
        Published: {
            type: Boolean,
            require: true
        },
        DataConfig: [{
            type: Types.ObjectId,
            required: true
        }]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IMission>('Mission', MissionSchema);