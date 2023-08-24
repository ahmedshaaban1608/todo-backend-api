import User from "../../db/users-schema.js";
import Task from "../../db/tasks-schema.js";
import bcrypt from "bcrypt";
import { createAuthorization } from "../../utilis/token.js";
import sendEmail from "../../utilis/sendEmail.js";

const saltRounds = 10;

const serverError = (error, res) => {
  res.status(500).json({
    message: "can't complete your request right now, please try again later",
  });
  console.log(error);
};

const signUp = async (req, res) => {
  const { name, email, password, age, gender, phone } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ message: "user is already exist, please login" });
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const createUser = await User.create({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        phone,
      });

      sendEmail({ name, email, id: createUser._id });
      res.status(200).json({
        message:
          "user is successfully created. we sent a verification message to your email, please verify your account",
        user: createUser,
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.isDeleted) {
        return res.status(403).json({
          message: "your account has been deleted, please contact support",
        });
      }
      if (!user.isVerified) {
        return res.status(401).json({
          message: "You must verify your account, please check your inbox",
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = createAuthorization(
          { id: user._id, email: user.email, password: user.password },
          "7d"
        );
        res.status(200).json({
          message: "user is successfully logged in",
          token,
        });
      } else {
        res.status(406).json({
          message: "password is not correct",
        });
      }
    } else {
      res.status(403).json({
        message: "email is not correct, or your account has been deleted",
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const verifyAccount = async (req, res) => {
  const id = req.params.id;
  if (id.length != 24) {
    return res.status(404).json({ message: "user id is invalid" });
  }
  try {
    const user = await User.findById(id);
    if (user) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { isVerified: true },
        { new: true }
      );
      res.status(200).json({
        message: "Account is verified successfully, you can login now",
        "updated user": updatedUser,
      });
    } else {
      res.status(404).json({ message: "user id is invalid" });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const changePassword = async (req, res) => {
  const id = req.userID;
  try {
    const userData = await User.findById(id);
    if (userData) {
      if (userData?.isDeleted) {
        const expiredToken = createAuthorization({ id: userData._id }, "1s");
        return res.status(403).json({
          message: "your account has been deleted, please contact support",
          token: expiredToken,
        });
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const user = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
      const token = createAuthorization(
        { id, email: user.email, password: user.password },
        "7d"
      );
      res.status(200).json({
        message: "password is updated successfuly",
        "new token": token,
      });
    } else {
      res.status(403).json({
        message: "can't find your account, or your account has been deleted",
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const updateUser = async (req, res) => {
  const id = req.userID;
  const { name, age, phone } = req.body;
  try {
    const userData = await User.findById(id);
    if (userData) {
      if (userData?.isDeleted) {
        const expiredToken = createAuthorization({ id: userData._id }, "1s");
        return res.status(403).json({
          message: "your account has been deleted, please contact support",
          token: expiredToken,
        });
      }
      const updatedData = {};
      if (name) updatedData.name = name;
      if (age) updatedData.age = age;
      if (phone) updatedData.phone = phone;
      const newData = await User.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
      );
      res.status(200).json({
        message: "user is updated successfully",
        "updated user": newData,
      });
    } else {
      res.status(403).json({
        message: "can't find your account, or your account has been deleted",
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const deleteUser = async (req, res) => {
  const id = req.userID;
  try {
    const user = await User.findById(id);
    if (user) {
      await Task.deleteMany({ userID: id });
      await User.findByIdAndDelete(id);
      const expiredToken = createAuthorization({ id: user._id }, "1s");
      return res.status(403).json({
        message: "your account has been deleted ",
        token: expiredToken,
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const softDeleteUser = async (req, res) => {
  const id = req.userID;
  try {
    const user = await User.findById(id);
    if (user) {
      const user = await User.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );

      const expiredToken = createAuthorization({ id: user._id }, "1s");
      return res.status(403).json({
        message: "your account has been deleted, please contact support",
        token: expiredToken,
        user: user,
      });
    } else {
      res.status(403).json({
        message: "can't find your account, or your account has been deleted",
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};
const userLogout = async (req, res) => {
  const id = req.userID;
  try {
    const user = await User.findById(id);
    if (user) {
      const expiredToken = createAuthorization({ id: user._id }, "1s");
      if (user?.isDeleted) {
        return res.status(403).json({
          message: "your account has been deleted, please contact support",
          token: expiredToken,
        });
      }
      return res.status(200).json({
        message: "you have successfully logged out",
        token: expiredToken,
      });
    } else {
      res.status(403).json({
        message: "can't find your account, or your account has been deleted",
      });
    }
  } catch (error) {
    serverError(error, res);
  }
};
export {
  signUp,
  signIn,
  verifyAccount,
  changePassword,
  updateUser,
  deleteUser,
  softDeleteUser,
  userLogout,
};
