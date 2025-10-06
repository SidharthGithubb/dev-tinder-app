const express = require("express");
const profileRouter = express.Router();
const {
  viewUserProfile,
  editUserProfile,
  deleteUserProfile,
} = require("../controllers/profileController");
const tokenValidator = require("../middlewares/tokenValidator");

//Private routes
profileRouter.get("/profile/view", tokenValidator, viewUserProfile);
profileRouter.patch("/profile/edit", tokenValidator, editUserProfile);
profileRouter.delete("/delete-profile", tokenValidator, deleteUserProfile);

module.exports = profileRouter;
