const express = require("express");
const profileRouter = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/profileController");
const tokenValidator = require("../middlewares/tokenValidator");

//Private routes
profileRouter.get("/profile", tokenValidator, getUserProfile);
profileRouter.patch("/update-profile", tokenValidator, updateUserProfile);
profileRouter.delete("/delete-profile", tokenValidator, deleteUserProfile);

module.exports = profileRouter;
