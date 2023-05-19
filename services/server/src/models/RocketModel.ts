import mongoose, { Document, Types, Schema } from "mongoose";

enum MotorType {
    solid = "Solid",
    liquid = "Liquid",
    hybrid = "Hybrid"
};

export interface IRocket {
    Name: string;
    Missions: [];
    Components: [];
    Mass: number;
    Height: number;
    Class: string;
    MotorType: string;
    Motor: string;
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
            enum: MotorType,
            required: true
        },
        Motor: {
            type: String
        },
        Mass: {
            type: String,
            required: true
        },
        Missions: [{
            type: Types.ObjectId,
            ref: 'Mission',
        }],
        Components: [{
            type: Types.ObjectId,
            ref: 'Component',
        }]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IRocket>('Rocket', RocketSchema);