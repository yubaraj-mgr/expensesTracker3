import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";
import { useState } from "react";
import Button from "@restart/ui/esm/Button";
import { deleteTransactionsFromServer } from "../helper/axiosHelper";
import { toast } from "react-toastify";

const TransactionTable = ({ transactions, fetchAllDataFromServer }) => {
  const [ids, setIds] = useState([]);

  let totalIncome = 0;
  let totalExpenses = 0;
  transactions.forEach((transaction) => {
    transaction?.type === "income"
      ? (totalIncome += transaction.amount)
      : (totalExpenses += transaction.amount);
  });
  const balance = totalIncome - totalExpenses;

  const handleOnChange = (e) => {
    const { id, name, checked } = e.target;
    if (name === "all") {
      const initialIds = [];
      transactions.forEach((transaction) => {
        initialIds.push(transaction._id);
      });
      if (checked) {
        setIds([...ids, ...initialIds]);
      } else {
        const removeInitialIds = ids.filter((id) => !initialIds.includes(id));
        setIds(removeInitialIds);
      }
      return;
    }
    if (checked) {
      setIds([...ids, id]);
    } else {
      const removeEachId = ids.filter((eachId) => eachId !== id);
      setIds(removeEachId);
    }
  };
  const handleOnDelete = async () => {
    if (
      !window.confirm("Are you sure, you want to delete the selected items?")
    ) {
      return;
    }
    try {
      const { status } = await deleteTransactionsFromServer(ids);
      status === "success"
        ? fetchAllDataFromServer()
        : toast.error("Please select item first to delete");
    } catch (error) {
      error && console.log(error);
    }
  };
  return (
    <>
      <Table className="mt-4" striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleOnChange}
                name="all"
              />
            </th>
            <th>Title</th>
            <th>Expenses</th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return transaction.type === "income" ? (
              <tr>
                <td>
                  <Form.Check
                    id={transaction._id}
                    type="checkbox"
                    checked={ids.includes(transaction._id)}
                    onChange={handleOnChange}
                  />
                </td>
                <td>{transaction.transactionName}</td>
                <td className="text-success">${transaction.amount}</td>
                <td></td>
              </tr>
            ) : (
              <tr>
                <td>
                  <Form.Check
                    id={transaction._id}
                    type="checkbox"
                    checked={ids.includes(transaction._id)}
                    onChange={handleOnChange}
                  />
                </td>
                <td>Freelancing</td>
                <td></td>
                <td className="text-danger">${transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {ids.length > 0 && (
        <Button className="bg-danger" onClick={handleOnDelete}>
          Delete
        </Button>
      )}
      <div className="text-end fw-bold">Balance: ${balance}</div>
    </>
  );
};

export default TransactionTable;
