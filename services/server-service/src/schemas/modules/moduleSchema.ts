import mongoose from "mongoose";
import FieldGroup from "./fieldGroupSchema";

const Module = new mongoose.Schema({
    Name: {
        type: String
    },
    FieldGroups: {
        type: [FieldGroup]
    },
    Status: {
        type: String,

    }
});

export default Module;
