import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
  },
});

const { reducer, actions } = transactionsSlice;

export const { setTransactions } = actions;

export default reducer;
