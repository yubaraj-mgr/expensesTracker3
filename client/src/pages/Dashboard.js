import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import TransactionForm from "../component/TransactionForm";
import TransactionTable from "../component/TransactionTable";
import { fetchAllDataFromTransactinServer } from "../helper/axiosHelper";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchAllDataFromServer();
  }, []);
  const fetchAllDataFromServer = async () => {
    const { status, response } = await fetchAllDataFromTransactinServer();
    status === "success" && setTransactions(response);
  };
  return (
    <MainLayout>
      <TransactionForm fetchAllDataFromServer={fetchAllDataFromServer} />
      <TransactionTable
        transactions={transactions}
        fetchAllDataFromServer={fetchAllDataFromServer}
      />
    </MainLayout>
  );
};

export default Dashboard;
