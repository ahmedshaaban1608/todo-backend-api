import Task from "../../db/tasks-schema.js";
import User from "../../db/users-schema.js";
import { createAuthorization } from "../../utilis/token.js";

const serverError = (error, res) => {
  res.status(500).json({
    message: "can't complete your request right now, please try again later",
  });
  console.log(error);
};

const addTask = async (req, res) => {
  const userID = req.userID;
  const { title, description, assignTo, deadline } = req.body;
  try {
    const user = await User.findById(userID);
    if (user) {
      if (user?.isDeleted) {
        const expiredToken = createAuthorization({ id: user._id }, "1s");
        return res.status(403).json({
          message: "Your account has been deleted, please contact support",
          token: expiredToken,
        });
      }
      const taskData = {
        title,
        description,
        status: "todo",
        userID,
        assignTo,
        deadline,
      };
      const task = await Task.create(taskData);

      res.status(200).json({ message: "the task is added successfully", task });
    } else {
      res.status(403).json({
        message: "can't find your account, or your account has been deleted",
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const updateTask = async (req, res) => {
  const userID = req.userID;
  const { id, title, description, status } = req.body;
  try {
    const user = await User.findById(userID);
    if (user) {
      if (user.isDeleted) {
        const expiredToken = createAuthorization({ id: user._id }, "1s");
        return res.status(403).json({
          message: "Your account has been deleted, please contact support",
          token: expiredToken,
        });
      }
      const task = await Task.findById(id);
      if (task) {
        if (task.userID == userID) {
          const updatedData = {};
          if (title) updatedData.title = title;
          if (description) updatedData.description = description;
          if (status) updatedData.status = status;
          const updated = await Task.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true }
          );
          res.json({
            message: "Task is updated successfully",
            updatedTask: updated,
          });
        } else {
          res.status(400).json({
            message: "You don't have permission to update this task",
          });
        }
      } else {
        res.json({
          message: "Task is not found",
        });
      }
    } else {
      res.status(403).json({
        message: "Can't find your account, or your account has been deleted",
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};

const deleteTasks = async (req, res) => {
  const userID = req.userID;
  const { id } = req.body;
  try {
    const user = await User.findById(userID);
    if (user) {
      if (user.isDeleted) {
        const expiredToken = createAuthorization({ id: user._id }, "1s");
        return res.status(403).json({
          message: "Your account has been deleted, please contact support",
          token: expiredToken,
        });
      }
      const task = await Task.findById(id);
      if (task) {
        if (task.userID == userID) {
          const deleted = await Task.findByIdAndDelete(id);
          res.json({
            message: "Task is deleted successfully",
            deletedTask: deleted,
          });
        } else {
          res.status(400).json({
            message: "You don't have permission to delete this task",
          });
        }
      } else {
        res.json({
          message: "Task is not found",
        });
      }
    } else {
      res.status(403).json({
        message: "Can't find your account, or your account has been deleted",
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};

const getTasksWithUsers = async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "userID",
      "_id name age gender phone"
    );
    if (tasks.length) {
      res.status(200).json({
        message: "Tasks is retrived successfully",
        "tasks with users": tasks,
      });
    } else {
      res
        .status(200)
        .json({ message: "There are no any tasks found to retrieve" });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const overdueTasks = async (req, res) => {
  try {
    const currentDate = new Date();
    const tasks = await Task.find({
      status: { $ne: "done" },
      deadline: { $lt: currentDate },
    });
    if (tasks.length) {
      res.status(200).json({
        message: "Tasks is retrived successfully",
        overdueTasks: tasks,
      });
    } else {
      res
        .status(200)
        .json({ message: "There are no any tasks found to retrieve" });
    }
  } catch (error) {
    serverError(error, res);
  }
};
export { addTask, updateTask, deleteTasks, getTasksWithUsers, overdueTasks };
