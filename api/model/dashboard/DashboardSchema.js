import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema({
  transactionName: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
});

export default mongoose.model("TransactionDetails", DashboardSchema);
