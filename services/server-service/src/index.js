const mongoose = require("mongoose");

// Only change the connection String
mongoose.connect("mongodb://loacalhost/GroundSupport",
    () => {
        console.log("Connect to Database")
    },
    err => console.error(err)
);
