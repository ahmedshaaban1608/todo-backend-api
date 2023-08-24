import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_URL;
const port = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbConnection = () => {
  mongoose
    .connect(`${url}:${port}/${dbName}`)
    .then(() => {
      console.log("db is connected");
    })
    .catch((e) => {
      console.log({ "Connect error": e });
    });
};
export default dbConnection;
