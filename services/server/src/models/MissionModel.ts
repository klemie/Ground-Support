import mongoose, { Document, Schema } from "mongoose";

export interface IMission {
    Name: String;
    IsTest: Boolean;
    LastUpdated: Date;
    Data: [mongoose.ObjectId, mongoose.ObjectId]
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
        LastUpdated: {
            type: Date
        },
        Data: {
            type: [mongoose.ObjectId, mongoose.ObjectId],
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IMission>('Generic', MissionSchema);