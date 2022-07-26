import express from "express";
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
        status: "success",
        message: "User Not Found Please check your email and password",
      });
    }
  } catch (error) {
    error && console.log(error);
  }
});

export default userRouter;
