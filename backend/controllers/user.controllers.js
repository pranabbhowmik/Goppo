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

// get user by id

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserById:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
