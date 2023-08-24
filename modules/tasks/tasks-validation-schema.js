import Joi from "joi";

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  assignTo: Joi.string().required(),
  deadline: Joi.date().required(),
});

const updateTaskSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("todo", "doing", "done"),
});
const deleteTaskSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export { addTaskSchema, updateTaskSchema, deleteTaskSchema };
