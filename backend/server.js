import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./router/authrouth.js";
import messageRoute from "./router/messageroutes.js";
import userRouters from "./router/userrouters.js";
import connectDb from "./db/db.js";
import { app, server } from "./socket/socket.js";
import path from "path";

// const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRouters);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
connectDb()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });
