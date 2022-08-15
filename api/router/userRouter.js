import express from "express";
import { bcryptPassword } from "../helpers/bcrypt.js";
import {
  addAdminToDatabase,
  emailVerificationValidation,
} from "../middleware/JoiMiddleWare/adminUserJoiMiddleWare.js";
import {
  deleteTransactions,
  fetchAllTransactions,
  insertTransactions,
} from "../model/dashboard/DashboardModel.js";
import {
  checkIfWeHaveUser,
  findOneAndUpdateUserAdmin,
  insertUserDetails,
} from "../model/user/Usermodel.js";
import { v4 as uuidv4 } from "uuid";
import { sendemail } from "../helpers/nodeMailer.js";

const userRouter = express.Router();

userRouter.post("/", addAdminToDatabase, async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashPassword = bcryptPassword(password);
    req.body.password = hashPassword;
    req.body.emailCode = uuidv4();
    const response = await insertUserDetails(req.body);
    const url = `http://localhost:3000/api/v1/verify?c=${response.emailCode}&e=${response.email}`;
    if (response?._id) {
      res.json({
        status: "success",
        message: "User Added Successfully",
        response,
      });
      sendemail({
        fName: response.firstName,
        email: response.email,
        url,
      });
    }
    return;
  } catch (error) {
    error && console.log(error);
  }
});

userRouter.patch(
  "/verify",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      const result = await findOneAndUpdateUserAdmin(req.body, {
        status: "active",
        emailCode: "",
      });
    } catch (error) {
      error && console.log(error);
    }
  }
);

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
        status: "error",
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
    const { authorization } = req.headers;
    console.log(authorization);
    const filter = {
      // userId is a keyword
      userId: authorization,
    };
    const response = await fetchAllTransactions(filter);
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
