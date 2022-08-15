import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDate } from "./tableActions";

const TransactionTable = ({ transactions }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDate());
  }, []);

  const alldata = useSelector((state) => state.allData);

  let totalIncome = 0;
  let totalExpenses = 0;
  transactions.forEach((transaction) => {
    const amount = parseInt(transaction.amount);
    transaction.type === "income"
      ? (totalIncome += amount)
      : (totalExpenses += amount);
  });
  const balance = totalIncome - totalExpenses;
  return (
    <>
      <Table className="mt-4" striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            return transaction.type === "income" ? (
              <>
                <tr key={index}>
                  <td>{transaction.transactionName}</td>
                  <td className="text-danger">${transaction.amount}</td>
                  <td></td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>{transaction.transactionName}</td>
                  <td></td>
                  <td className="text-danger">${transaction.amount}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <div className="text-end fw-bold">Balance: ${balance}</div>
    </>
  );
};

export default TransactionTable;
