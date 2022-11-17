const mongoose = require("mongoose");

const NestedSchema = new mongoose.Schema({
    Name: String,
    NumberField: String
});

// Validation only runs on create or save 

const ExampleSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: true,
        lowercase: true, // converts to lowercase
        validator: { // checks if even
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    NumberField: {
        type: Number,
        min: 0, // lower bound 
        max: 100 //upper bound (works for Strings too)
    },
    DateField: {
        type: Date,
        immutable: true, // not changeable
        default: () => Date.now() // creates current date if not provided
    },
    ForginKey: mongoose.SchemaTypes.ObjectId,
    Array: [String],
    Nested: NestedSchema
});

const ExampleEntity = mongoose.model("example", ExampleSchema);

exports = ExampleEntity;