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

const FieldModel = mongoose.model("example", Field);

export {};
module.exports = FieldModel;