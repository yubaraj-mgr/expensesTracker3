import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "inactive",
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  emailCode: {
    type: String,
  },
});

export default mongoose.model("UsersDetails", UserSchema);
