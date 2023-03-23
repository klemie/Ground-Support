import mongoose, { Document, Schema } from "mongoose";

export interface IFieldData {
    Value: Number;
};

export interface IFieldDataModel extends IFieldData, Document { };

const FieldDataSchema: Schema = new Schema(
    {
        Value: {
            type: Number,
            required: true,
            immutable: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IFieldData>('Generic', FieldDataSchema);