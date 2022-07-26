import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { insertTransactionsDetailsToServer } from "../helper/axiosHelper";

const initialObject = {
  transactionName: "",
  amount: "",
  type: "",
};
const TransactionForm = ({ fetchAllDataFromServer }) => {
  const [transactionsDeatils, setTransactionsDeatils] = useState(initialObject);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTransactionsDeatils({ ...transactionsDeatils, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { status } = await insertTransactionsDetailsToServer(
      transactionsDeatils
    );
    status === "success" && fetchAllDataFromServer();
  };
  return (
    <Form className="mt-4" onSubmit={handleOnSubmit}>
      <h4>Add Transaction</h4>
      <Row className="g-2">
        <Col md="2">
          <Form.Control
            placeholder="Transaction name"
            onChange={handleOnChange}
            name="transactionName"
          />
        </Col>
        <Col md="5">
          <Form.Select
            defaultValue="Choose..."
            onChange={handleOnChange}
            name="type"
          >
            <option value="">Choose...</option>
            <option value="income">Income.</option>
            <option value="expenses">Expenses</option>
          </Form.Select>
        </Col>
        <Col md="2">
          <Form.Control
            type="number"
            name="amount"
            placeholder="amount"
            onChange={handleOnChange}
          />
        </Col>
        <Col md="2">
          <Form.Control type="submit" className="btn btn-primary" />
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionForm;
