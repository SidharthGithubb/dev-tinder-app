const express = require('express');
const router = express.Router();
const {registerUser, updateUserProfile} = require('../controllers/userController');
router.post('/register', registerUser);
router.patch('/update-profile/:userId', updateUserProfile);
module.exports = router;