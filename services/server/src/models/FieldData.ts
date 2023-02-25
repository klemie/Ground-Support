import mongoose, { Document, Schema } from "mongoose";

export interface IFieldData {
    Value: Number;
    FieldName: String;
};

export interface IFieldDataModel extends IFieldData, Document { };

const FieldDataSchema: Schema = new Schema(
    {
        FieldName: {
            type: String,
            required: true
        },
        Value: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IFieldData>('Generic', FieldDataSchema);