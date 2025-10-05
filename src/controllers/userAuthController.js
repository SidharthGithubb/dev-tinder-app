const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//DESC Register a new user
//POST /api/users/register
//Public
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      bio,
      skill,
      role,
    } = req.body;
    if (!firstName || !lastName || !emailId || !password) {
      throw new Error("Please provide the mandatory fields");
    }
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
      bio,
      skill,
      role,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

//DESC Login user
//POST /api/users/login
//Public
const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("User not registered");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid Password");
    } else {
      //Generate JWT token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { expiresIn: "1h" });
      res.status(200).json({ message: "User logged in successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
