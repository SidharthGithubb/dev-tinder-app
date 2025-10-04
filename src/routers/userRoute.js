const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/userAuthController');
const {updateUserProfile} = require('../controllers/userProfileController');
router.post('/register', registerUser);
router.post('/login', loginUser);

router.put('/users/:userId/profile', updateUserProfile);
module.exports = router;