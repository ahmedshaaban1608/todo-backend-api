import express from "express";
import {
  validateAdd,
  validateUpdate,
  validateDelete,
} from "./tasks-validation.js";
import {
  addTask,
  updateTask,
  deleteTasks,
  getTasksWithUsers,
  overdueTasks,
} from "./tasks-controller.js";
import { verifyAuthorization } from "../../utilis/token.js";
const taskRouter = express.Router();

taskRouter.post("/tasks", verifyAuthorization, validateAdd, addTask);
taskRouter.patch("/tasks", verifyAuthorization, validateUpdate, updateTask);
taskRouter.delete("/tasks", verifyAuthorization, validateDelete, deleteTasks);
taskRouter.get("/taskswithusers/", getTasksWithUsers);
taskRouter.get("/overduetasks", overdueTasks);

export default taskRouter;
