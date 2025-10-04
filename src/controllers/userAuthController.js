const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//DESC Register a new user
//POST /api/users/register
//Public
const registerUser = async (req, res) => {
    const {firstName, lastName, emailId, password,age, gender, bio,skill} = req.body;
    if(!firstName || !lastName || !emailId || !password){
        return res.status(400).json({message: "Please provide the mandatory fields"});
    }
    const existingUser = await User.findOne({emailId});
    if(existingUser){
        return res.status(400).json({message: "User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
       const newUser = await User.create({
        firstName,
        lastName,
        emailId,
        password: hashedPassword,
        age,
        gender,
        bio,
        skill
    }) 
    res.status(201).json({message: "User registered successfully", user: newUser});
    } catch (error) {
        res.status(500).json({message: "Error registering user", error: error.message});
    }   
}

//DESC Login user
//POST /api/users/login
//Public
const loginUser = async (req,res) => {
    try {
        const {emailId, password} = req.body;
        if(!emailId || !password){
            return res.status(400).json({message: "Please provide email and password"});
        }
        const user = await User.findOne({emailId});
        if(!user){
            return res.status(400).json({message: "User not registered"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message: "Invalid Password"});
        }
        else{
            //Generate JWT token
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.cookie("token", token,{expiresIn: '1h'});
            res.status(200).json({message: "User logged in successfully"});
        }
    } catch (error) {
        res.status(500).json({message: "Error logging in user", error: error.message});
    }
}



module.exports = {registerUser,loginUser};