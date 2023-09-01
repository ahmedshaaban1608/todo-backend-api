import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.TOKEN_SECRET;
const verifyAuthorization = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  try {
    const user = jwt.verify(token, secret);
    req.userID = user.id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Access denied, invalid token" });
  }
};

const createAuthorization = (user, expire) => {
  const token = jwt.sign(user, secret, { expiresIn: expire });
  return token;
};
export { verifyAuthorization, createAuthorization };
