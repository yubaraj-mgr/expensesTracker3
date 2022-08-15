import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import TransactionForm from "../component/TransactionForm";
import TransactionTable from "../component/TransactionTable";
import { fetchAllDataFromTransactinServer } from "../helper/axiosHelper";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const naviGate = useNavigate();
  useEffect(() => {
    fetchAllDataFromServer();
  }, []);
  const fetchAllDataFromServer = async () => {
    const { status, response } = await fetchAllDataFromTransactinServer();
    status === "success" && setTransactions(response);
  };

  const handleOnLogout = () => {
    const User = window.localStorage.removeItem("User");
    naviGate("/login");
  };
  return (
    <MainLayout>
      <TransactionForm fetchAllDataFromServer={fetchAllDataFromServer} />
      <TransactionTable
        transactions={transactions}
        fetchAllDataFromServer={fetchAllDataFromServer}
      />
      <button onClick={handleOnLogout}>Logout</button>
    </MainLayout>
  );
};

export default Dashboard;
