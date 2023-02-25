import mongoose, { Document, Schema } from "mongoose";

export interface IRocketProfile {
    RocketName: string;
    Height: number;
    Class: string;
    MotorType: string;
    Motor: string;
};

export interface IRocketProfileModel extends IRocketProfile, Document { };

const RocketProfileSchema: Schema = new Schema(
    {
        RocketName: {
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
            validate: {
                validator: (c: string) => {
                    const cl = c.toLowerCase();
                    return cl === "10k" || "30k";
                },
                message: "Current available classes are 10K and 30K"
            }
        },
        MotorType: {
            type: String,
            required: true,
            validate: {
                validator: (mt: string) => {
                    const type = mt.toLowerCase();
                    return type == "solid" || type == "hybrid" || type == "liquid";
                },
                message: "Must be of type solid, hybrid or liquid"
            }
        },
        Motor: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IRocketProfile>('Rocket Profile', RocketProfileSchema);