import validateFun from "../../utilis/validactionFun.js";
import {
  addTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} from "./tasks-validation-schema.js";

const validateAdd = validateFun(addTaskSchema);
const validateUpdate = validateFun(updateTaskSchema);
const validateDelete = validateFun(deleteTaskSchema);

export { validateAdd, validateUpdate, validateDelete };
