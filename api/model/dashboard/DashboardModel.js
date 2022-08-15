import DashboardSchema from "./DashboardSchema.js";

export const insertTransactions = (data) => {
  return DashboardSchema(data).save();
};

export const fetchAllTransactions = (filter) => {
  return DashboardSchema.find(filter);
};

export const deleteTransactions = (ids) => {
  return DashboardSchema.deleteMany({
    _id: {
      $in: ids,
    },
  });
};
