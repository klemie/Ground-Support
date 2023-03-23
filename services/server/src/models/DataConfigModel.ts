import mongoose, { Document, Schema, Types } from "mongoose";

export interface IDataConfig {
    FieldGroups: []
};

export interface IDataConfigModel extends IDataConfig, Document { };

const DataConfigSchema: Schema = new Schema(
    {
        FieldGroups: [{ type: Types.ObjectId, ref: "FieldGroup" }]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IDataConfig>('Generic', DataConfigSchema);