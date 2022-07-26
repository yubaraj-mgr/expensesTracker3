import UserSchema from "./UserSchema.js";

export const insertUserDetails = (data) => {
  return UserSchema(data).save();
};

export const checkIfWeHaveUser = (email) => {
  return UserSchema.findOne(email);
};
