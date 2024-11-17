import User from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password != confirmPassword) {
      return res.status(400).json({ error: "Password don't metch" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilepic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilepic: newUser.profilepic,
    });
  } catch (error) {
    console.log("Error fron Signup Method", error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordcorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordcorrect) {
      return res.status(400).json({ error: "Password incurrect" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log("Error from login Method", error.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ error: "Logged out Successfully" });
  } catch (error) {
    console.log("logout method Error", error.message);
  }
};

export default { signup, login, logout };
