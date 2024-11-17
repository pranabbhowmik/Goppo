import User from "../model/user.model.js";

export const getUsersForSideber = async (req, res) => {
  try {
    const loggendInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggendInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSideber:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
