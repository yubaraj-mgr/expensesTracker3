import mongoose from "mongoose";

const dbConnect = () => {
  try {
    const apiE = "mongodb://localhost:27017/expensesTracker3";
    const conn = mongoose.connect(apiE);
    conn && console.log("Database Connected Successfully");
  } catch (error) {
    error && console.log(error);
  }
};

export default dbConnect;
