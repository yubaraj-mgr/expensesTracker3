import { fetchAllDataFromTransactinServer } from "../helper/axiosHelper";
import { setTransactions } from "./transactionsSlice";

export const fetchAllDate = () => async (dispatch) => {
  const { status, response } = await fetchAllDataFromTransactinServer();
  status === "success" && dispatch(setTransactions(response));
};
