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

const ModuleModel = mongoose.model("example", Module);

export {};
module.exports = ModuleModel;