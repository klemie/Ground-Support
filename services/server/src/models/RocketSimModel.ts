import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRocketSimModel {
    Name: string;
    DryMass: number;
    WetMass: number;
    CenterOfGravity: number;
    CenterOfPressure: number;
    RocketLength: number;
    RocketDiameter: number;
    FuselageLength: number;
    FuselageDiameter: number;
    AeroDimensions?: IAeroDimensions;
};

enum NoseConeShape {
    Elliptical = "Elliptical",
    Conical = "Conical",
    Parabolic = "Parabolic",
    PowerSeries = "PowerSeries"
};

interface IAeroDimensions {
    NoseCone: {
        Length: number;
        Diameter: number;
        TipRadius: number;
        Shape: NoseConeShape;
    },
    BoatTail: {
        Length: number;
        ForeDiameter: number;
        AftDiameter: number;
    },
    Fins: {
        Count: number;
        Span: number;
        RootChord: number;
        TipChord: number;
        Sweep: number;
        Thickness: number;
    }
}

const AeroDimensions: Schema = new Schema(
    {
        NoseCone: {
            Length: {
                type: Number,
                required: true
            },
            Diameter: {
                type: Number,
                required: true
            },
            TipRadius: {
                type: Number,
                required: true
            },
            Shape: {
                type: String,
                enum: Object.values(NoseConeShape),
                required: true
            }
        },
        BoatTail: {
            Length: {
                type: Number,
                required: true
            },
            ForeDiameter: {
                type: Number,
                required: true
            },
            AftDiameter: {
                type: Number,
                required: true
            }
        },
        Fins: {
            Count: {
                type: Number,
                required: true
            },
            Span: {
                type: Number,
                required: true
            },
            RootChord: {
                type: Number,
                required: true
            },
            TipChord: {
                type: Number,
                required: true
            },
            Sweep: {
                type: Number,
                required: true
            },
            Thickness: {
                type: Number,
                required: true
            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export interface IRocketSimModelModel extends IRocketSimModel, Document { };

export const RocketSimModelSchema = new Schema(
    {
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
        FuselageLength: {
            type: Number,
            required: true,
            validator: (length: number) => {
                return length > 0 && !isNaN(length);
            }
        },
        FuselageDiameter: {
            type: Number,
            required: true,
            validator: (diameter: number) => {
                return diameter > 0 && !isNaN(diameter);
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
            required: true
        },
        CenterOfPressure: {
            type: Number,
            required: true
        },
        AeroDimensions: {
            type: AeroDimensions,
            required: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const RocketSimModel = mongoose.model<IRocketSimModel>("RocketSimModel", RocketSimModelSchema);