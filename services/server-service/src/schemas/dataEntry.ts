import mongoose from "mongoose";

// holds csv like data for each field groups data. ie. fields data gets mapped to one of these objects 
const DataEntry = new mongoose.Schema({
    data: {
        type: Object,
        required: true
    },
    timestamp: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
});

export default DataEntry;