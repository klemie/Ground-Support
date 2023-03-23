import mongoose, { Document, Types, Schema } from "mongoose";

export interface IRocket {
    Name: string;
    Date: Date;
    Height: number;
    Class: string;
    MotorType: string;
    Motor: string;
    Coordinates: Array<number>;
    Missions: [];
};

export interface IRocketModel extends IRocket, Document { };

const RocketSchema: Schema = new Schema(
    {
        Name: {
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
            validate: {
                validator: (mt: string) => {
                    const type = mt.toLowerCase();
                    return type == "solid" || type == "hybrid" || type == "liquid";
                },
                message: "Must be of type solid, hybrid or liquid"
            },
            required: true
        },
        Motor: {
            type: String,
            required: true
        },
        Missions: [{
            type: Types.ObjectId,
            ref: 'Mission',
        }]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IRocket>('Rocket', RocketSchema);