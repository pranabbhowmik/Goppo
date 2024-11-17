import { DB_NAME } from "../constand.js";
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URL}/${DB_NAME}`
    );
    console.log(
      `\n Mongodb connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error in connecting to DB", error);
    process.exit(1);
  }
};

export default connectDb;
