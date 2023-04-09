import mongoose, { Document, Schema, Types } from "mongoose";
import { isValidLongitude, isValidLatitude } from "../library/CoordinateValidation";


interface ICoordinates {
    Latitude: number;
    Longitude: number;
};

export interface IMission {
    Name: string;
    IsTest: boolean;
    Date: Date;
    Coordinates: ICoordinates;
    LaunchAltitude: number;
    Components: [Types.ObjectId];
    Published: boolean;
};

export interface IMissionModel extends IMission, Document { };

const CoordinatesSchema: Schema = new Schema(
    {
        Latitude: {
            type: Number,
            required: true,
            validator: (lat: number) => {
                return isValidLatitude(lat);
            }
        },
        Longitude: {
            type: Number,
            required: true,
            validator: (long: number) => {
                return isValidLongitude(long);
            }
        }
    }
);

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
        LaunchAltitude: {
            type: Number,
            required: true
        },
        Date: {
            type: Date,
            required: true
        },
        Coordinates: CoordinatesSchema,
        Components: [{
            type: Types.ObjectId,
            ref: 'Component'
        }],
        Published: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IMission>('Mission', MissionSchema);