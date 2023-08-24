import validateFun from "../../utilis/validactionFun.js";
import {
  signInSchema,
  signUpSchema,
  changePasswordSchema,
  updateSchema,

} from "./users-validation-schema.js";

const validateSignUp = validateFun(signUpSchema);
const validateSignIn = validateFun(signInSchema);
const validateChangePass = validateFun(changePasswordSchema);
const validateUpdate = validateFun(updateSchema);


export {
  validateSignIn,
  validateSignUp,
  validateChangePass,
  validateUpdate,

};
