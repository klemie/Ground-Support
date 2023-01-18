import mongoose, { Document, Schema } from "mongoose";

export interface IRocketProfile {
    rocketName: String;
    Height: Number;
    Class: String;
    MotorType: String;
    Motor: String;
};

export interface IRocketProfileModel extends IRocketProfile, Document { };

const RocketProfileSchema: Schema = new Schema(
    {
        rocketName: {
            type: String,
            required: true
        },
        Height: {
            type: Number,
            required: true
        },
        Class: {
            type: String,
            required: true,
            validator: (c: String) => {

            }
        },
        MotorType: {
            type: String,
            required: true,
            validator: (mt: String) => {

            }
        },
        Motor: {
            type: String,
            required: true,
            validator: (m: String) => {

            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IRocketProfile>('Rocket Profile', RocketProfileSchema);