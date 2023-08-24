const validateFun = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body, { abortEarly: false });
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.details });
  }
  return next();
};
export default validateFun;
