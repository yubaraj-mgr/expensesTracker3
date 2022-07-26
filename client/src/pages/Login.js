import React, { useRef } from "react";
import MainLayout from "../layout/MainLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { checkUserLoginDetails } from "../helper/axiosHelper";
import { toast } from "react-toastify";

const Login = () => {
  const naviGate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const { status, message, response } = await checkUserLoginDetails({
      email,
      password,
    });
    toast[status](message);
    if (status === "success") {
      window.localStorage.setItem("User", JSON.stringify(response));
      naviGate("/dashboard");
    }
  };
  return (
    <MainLayout>
      <div className="d-flex justify-content-center mt-5">
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="newHere">
          New Here? &nbsp;<Link to="/register"> Register</Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
