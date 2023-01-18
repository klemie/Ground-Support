import mongoose, { Document, Schema } from "mongoose";
import MissionModel from "./MissionModel";

export interface IRocket {
    Name: String;
    Date: Date;
    Coordinates: Array<Number>;
    Mission: Array<mongoose.ObjectId>
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
            validator: (cs: Array<Number>) => {

            }
        },
        Mission: {
            type: mongoose.ObjectId,
            ref: 'Mission'
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IRocket>('Rocket', RocketSchema);