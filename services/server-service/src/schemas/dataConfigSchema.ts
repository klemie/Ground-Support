import mongoose from "mongoose";
import * as Modules from "./modules/moduleSchema";

const DataConfig = new mongoose.Schema({
    Name: {
        type: String
    },
    Modules: {
        type: [Modules]
    },
    CreatedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
});

export default mongoose.model("example", DataConfig);