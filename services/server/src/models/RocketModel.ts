import mongoose, { Document, Schema } from "mongoose";
import MissionModel from "./MissionModel";
import { isValidCoordinates } from "../library/CoordinateValidation";

export interface IRocket {
    Name: string;
    Date: Date;
    Coordinates: Array<number>;
    Mission: Array<mongoose.Schema.Types.ObjectId>
};

export interface IRocketModel extends IRocket, Document { };

const RocketSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Date: {
            type: Date,
            required: true
        },
        Coordinates: {
            type: Array,
            require: true,
            validator: (cs: Array<number>) => {
                return isValidCoordinates(cs[0], cs[1]);
            }
        },
        Mission: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mission',
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IRocket>('Rocket', RocketSchema);