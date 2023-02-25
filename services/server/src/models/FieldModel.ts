import mongoose, { Document, Schema } from "mongoose";

export interface IField {
    Name: String;
    Range: Array<Number>
};

export interface IGenericModel extends IField, Document { };

const FieldSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Range: {
            type: Array<Number>,
            required: true,
            validator: (r: Array<Number>) => {

            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IField>('Generic', FieldSchema);