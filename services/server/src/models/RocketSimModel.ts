import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRocketSim {
    Name: string;
    DryMass: number;
    WetMass: number;
    CenterOfGravity: number;
    CenterOfPressure: number;
    FuselageDiameter: number;
    FuselageLength: number;
    RocketLength: number;
};

export interface IRocketSimModel extends IRocketSim, Document { };

export const RocketSimSchema = new Schema(
    {
        // entity properties
        Name: { 
            type: String, 
            required: true
        },
        DryMass: { 
            type: Number, 
            required: true,
            validator: (mass: number) => {
                return mass > 0 && !isNaN(mass);
            }
        },
        WetMass: { 
            type: Number, 
            required: true,
            validator: (mass: number) => {
                return mass > 0 && !isNaN(mass);
            }
        },
        FuselageDiameter: {
            type: Number,
            required: true,
            validator: (diameter: number) => {
                return diameter > 0 && !isNaN(diameter);
            }
        },
        FuselageLength: {
            type: Number,
            required: true,
            validator: (length: number) => {
                return length > 0 && !isNaN(length);
            }
        },
        RocketLength: {
            type: Number,
            required: true,
            validator: (length: number) => {
                return length > 0 && !isNaN(length);
            }
        },
        CenterOfGravity: {
            type: Number,
            required: true,
            validator: (length: number) => {
                return length > 0 && !isNaN(length);
            }
        },
        CenterOfPressure: {
            type: Number,
            required: true,
            validator: (length: number) => {
                return length > 0 && !isNaN(length);
            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const RocketSim = mongoose.model<IRocketSimModel>("RocketSim", RocketSimSchema);