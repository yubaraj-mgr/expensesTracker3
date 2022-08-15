import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "./component/transactionsSlice";

export const store = configureStore({
  reducer: {
    allData: transactionsSlice,
  },
});
