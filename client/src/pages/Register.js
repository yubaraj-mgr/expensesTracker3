import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../App.css";
import { insertUsersToServer } from "../helper/axiosHelper";
import { toast } from "react-toastify";

const initialUserObj = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [userDetails, setUserDetails] = useState(initialUserObj);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...newUserDetails } = userDetails;
    const { status, message, response } = await insertUsersToServer(
      newUserDetails
    );
    if (status === "success") {
      toast[status](message);
      setUserDetails(initialUserObj);
    } else {
      toast[status](message);
    }
  };
  return (
    <MainLayout>
      <div className="d-flex justify-content-center mt-5">
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleOnChange}
              value={userDetails.firstName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleOnChange}
              value={userDetails.lastName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleOnChange}
              value={userDetails.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
              value={userDetails.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              onChange={handleOnChange}
              value={userDetails.confirmPassword}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="newHere">
          Already have account? &nbsp;<Link to="/login"> Login</Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
