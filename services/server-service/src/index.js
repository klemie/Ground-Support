import mongoose from "mongoose";
// import entities below
import ExampleEntity from "./schemas/exampleSchema";

mongoose.connect("mongodb://loacalhost/GroundSupport",
    () => {
        console.log("Connect to Database")
    },
    err => console.error(err)
);

createEntity();
async function createEntity() {
    // const exampleEntity = new ExampleEntity({ name: "101", exampleNumber: 43 });
    // await exampleEntity.save();
    // or
    try {
        const exampleEntity = await exampleEntity({ name: "Entity", exampleNumber: 0 });
        console.log(exampleEntity);
    } catch (err) {
        console.log(err.message);
    }
}

async function updateEntity(exampleEntity, attribute) {
    exampleEntity.name = attribute;
    await exampleEntity.save();
    console.log(exampleEntity);
}
