import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import dbConnect from "./config/DbConnect.js";

const app = express();
// for post to work
app.use(express.json());
// for cors to work middle ware
app.use(cors());
// for Database To Connect
dbConnect();
app.use("/api/v1", userRouter);

app.listen(8000, (error) => {
  error && console.log(error);
});
