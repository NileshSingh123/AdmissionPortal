const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/admissionportal";
const live_url =
  "mongodb+srv://ns800622:neelesh123@cluster0.wpdlnci.mongodb.net/admissionportal?retryWrites=true&w=majority";

const connectDB = () => {
  // For local DB
  return (
    mongoose
      .connect(live_url)

      // For cloud DB
      // return mongoose.connect(database)

      .then(() => {
        console.log("Connected Succeessfully");
      })
      .catch((error) => {
        console.log(error);
      })
  );
};
module.exports = connectDB;
