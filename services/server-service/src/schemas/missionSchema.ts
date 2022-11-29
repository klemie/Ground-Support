import mongoose from "mongoose";
import * as CoordinatePair from "./coordinatePairSchema";

const Mission = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    UpdatedAt: {
        type: Date,
        default: () => Date.now()
    },
    LaunchDate: {
        type: Date
    },
    // Coordinates: {
    //     type: [CoordinatePair]
    // },
    TestIds: {
        type: mongoose.SchemaTypes.ObjectId
    },
    DataConfigId: {
        require: true,
        type: mongoose.SchemaTypes.ObjectId
    }
});

export default mongoose.model("example", Mission);