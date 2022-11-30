import mongoose from "mongoose";
import * as FieldGroups from "./fieldGroupSchema";

const Module = new mongoose.Schema({
    Name: {
        type: String
    },
    FieldGroups: {
        type: [FieldGroups]
    },
    Status: {
        type: String,

    }
});

export default mongoose.model("Module", Module);
