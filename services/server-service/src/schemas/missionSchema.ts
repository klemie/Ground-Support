import mongoose from "mongoose";
import * as CoordinatePair from "./coordinatePairSchema";
import * as DataEntry from "./dataEntry"

const MissionData = new mongoose.Schema({
    Entries: [DataEntry.schema],
    Test: {
        type: Boolean,
        require: true
    }
});

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
    // LaunchDate: { Not required for MVP
    //     type: Date
    // },
    // Coordinates: {
    //     type: [CoordinatePair]
    // },
    DataConfigId: {
        require: true,
        type: mongoose.SchemaTypes.ObjectId
    },
    Data: { // Each entry is a new run of the data. They will have the test flag until
        type: [MissionData]
    }
});

export default mongoose.model("Mission", Mission);