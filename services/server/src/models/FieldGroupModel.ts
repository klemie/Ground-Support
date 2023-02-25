import mongoose, { Document, Schema } from "mongoose";

export interface IFieldGroup {
    Name: String;
    FieldIds: Array<mongoose.ObjectId>
};

export interface IFieldGroupModel extends IFieldGroup, Document { };

const FieldGroupSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        FieldIds: {
            types: Array<mongoose.ObjectId>,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IFieldGroup>('Field Group', FieldGroupSchema);