const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
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

//DESC Upate user profile
//PUT /api/users/profile
//Private
const updateUserProfile = async (req,res) => {
    try {
        const userId = req.params?.userId;
        const ALLOWED_UPDATES = ['age','gender','bio', 'skill'];
        const isUpdateAllowed = Object.keys(req.body).every((k)=>{
           return ALLOWED_UPDATES.includes(k);
        });

        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        const user = await User.findById(userId);
        console.log(user);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true, runValidators: true});
        res.status(200).json({message: "User profile updated successfully", user: updatedUser});
    } catch (error) {
        res.status(500).json({message: "Error updating user profile", error: error.message});
    }
}

module.exports = {registerUser, updateUserProfile};