const mongoose = require("mongoose");
// import mongoose from "mongoose";

// Only change the connection String
mongoose.connect(
  "mongodb+srv://SupportAdmin:<password>@groundsupport.oyv5cl3.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("Connect to Database");
  },
  (err) => console.error(err)
);

// on startup create a new database only use this database if in local mode. Check if local database and compare with remote. Prompt a upload option.
