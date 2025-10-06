const User = require("../models/userModel");

//DESC Get User Profile
//GET /api/users/profile
//Private
const viewUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; //From token
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role === "admin") {
      const allUsers = await User.find().select("-password");
      return res.status(200).json({ users: allUsers });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};
//DESC Update user profile
//PUT /api/users/profile
//Private
const editUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; //From token
    const ALLOWED_EDIT_FIELDS = ["firstName", "lastName", "age", "gender", "bio", "skill", "role", "photoUrl"];
    const isEditAllowed = Object.keys(req.body).every((k) => {
      return ALLOWED_EDIT_FIELDS.includes(k);
    });

    if (!isEditAllowed) {
      throw new Error("Update not allowed");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};
//DESC Delete user profile
//DELETE /api/users/profile
//Private
const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; //From token
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user profile", error: error.message });
  }
};
module.exports = { viewUserProfile, editUserProfile, deleteUserProfile };
