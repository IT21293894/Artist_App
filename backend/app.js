import express from "express";
import mongoose from "mongoose";
import router from "./routes/event-routes";
import userRouter from "./routes/user-routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/event", router);

mongoose
  .connect(
    "mongodb+srv://admin:MRiMQlQtoUpMnbgx@cluster0.qlgwwjz.mongodb.net/Event?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connect To database and Listening To Localhost 5000")
  )
  .catch((err) => console.log(err));

//MRiMQlQtoUpMnbgx
