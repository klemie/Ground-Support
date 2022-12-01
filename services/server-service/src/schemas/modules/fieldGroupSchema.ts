import mongoose from "mongoose";

const FieldValue = new mongoose.Schema({
    Value: {
        type: mongoose.SchemaTypes.Decimal128,
        timestamps: true
    },
});

const Field = new mongoose.Schema({
    Name: String,
    values: [FieldValue],
    Range: [Number]
});

const FieldGroup = new mongoose.Schema({
    Name: String,
    Fields: {
        type: [Field]
    } 
});

const FieldGroupModel = mongoose.model("FieldGroup", FieldGroup);

export default FieldGroup;
