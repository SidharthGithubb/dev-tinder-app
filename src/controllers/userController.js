const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const registerUser = async (req, res) => {
    const {firstName, lastName, emailId, password,age, gender} = req.body;
    if(!firstName || !lastName || !emailId || !password || !age ||!gender){
        return
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
        gender
    }) 
    res.status(201).json({message: "User registered successfully", user: newUser});
    } catch (error) {
        res.status(500).json({message: "Error registering user", error: error.message});
    }   
}

module.exports = {registerUser};