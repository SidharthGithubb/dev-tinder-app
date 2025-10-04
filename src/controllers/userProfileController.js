const User = require('../models/userModel');
//DESC Update user profile
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
module.exports = {updateUserProfile};