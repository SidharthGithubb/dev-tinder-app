const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/userAuthController");
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userProfileController");
const tokenValidator = require("../middlewares/tokenValidator");

//Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
//Private routes
router.get("/profile", tokenValidator, getUserProfile);
router.patch("/update-profile", tokenValidator, updateUserProfile);
router.delete("/delete-profile", tokenValidator, deleteUserProfile);
module.exports = router;
