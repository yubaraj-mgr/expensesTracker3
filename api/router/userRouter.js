import express from "express";
import {
  deleteTransactions,
  fetchAllTransactions,
  insertTransactions,
} from "../model/dashboard/DashboardModel.js";
import {
  checkIfWeHaveUser,
  insertUserDetails,
} from "../model/user/Usermodel.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const response = await insertUserDetails(req.body);
    res.json({
      status: "success",
      message: "User Added Successfully",
      response,
    });
  } catch (error) {
    error && console.log(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await checkIfWeHaveUser({ email });
    if (response?.password === password) {
      response.password = undefined;
      res.json({
        status: "success",
        message: "User Found",
        response,
      });
    } else {
      res.json({
        status: "Error",
        message: "User Not Found Please check your email and password",
      });
    }
  } catch (error) {
    error && console.log(error);
  }
});

userRouter.post("/dashboard", async (req, res, next) => {
  try {
    const response = await insertTransactions(req.body);
    res.json({
      status: "success",
      message: "User Added Successfully",
      response,
    });
  } catch (error) {
    error && console.log(error);
  }
});

userRouter.get("/dashboard", async (req, res, next) => {
  try {
    const response = await fetchAllTransactions();
    res.json({
      status: "success",
      message: "User Added Successfully",
      response,
    });
  } catch (error) {
    error && console.log(error);
  }
});

userRouter.delete("/dashboard", async (req, res, next) => {
  try {
    const response = await deleteTransactions(req.body);
    res.json({
      status: "success",
      message: "Transactions Deleted Successfully",
      response,
    });
  } catch (error) {
    error && console.log(error);
  }
});

export default userRouter;
