import bcrypt from "bcryptjs";

const salt = 10;

export const bcryptPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};
