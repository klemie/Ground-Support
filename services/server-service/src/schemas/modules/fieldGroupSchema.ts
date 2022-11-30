import mongoose from "mongoose";
const Field = require('./fieldSchema');

const FieldGroup = new mongoose.Schema({
    Name: String,
    Fields: [Field]
});

export default mongoose.model("FieldGroup", FieldGroup);
