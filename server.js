import express from "express";
import dbConnection from "./db/connect-db.js";
import dotenv from "dotenv";
import userRouter from "./modules/users/users-router.js";
import taskRouter from "./modules/tasks/tasks-router.js";

dotenv.config();
const port = process.env.SERVER_PORT;
const url = process.env.SERVER_URL;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on ${url}:${port}`);
});
app.use(userRouter);
app.use(taskRouter);
dbConnection();

const homepage = (req, res) => {
  res.send(`<body style="background-color: wheat">
  <div style="display: flex;
      justify-content: center;
      align-items: center;
      height: 500px;">
    <h1 style="font-size:50px;">ToDo Project</h1>
  </div></body>`);
};
app.get("/", homepage);
