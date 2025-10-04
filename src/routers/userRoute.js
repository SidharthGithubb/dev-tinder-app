const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/userAuthController');
const {updateUserProfile} = require('../controllers/userProfileController');
const tokenValidator = require('../middlewares/tokenValidator');

//Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
//Private routes
router.patch('/update-profile', tokenValidator, updateUserProfile);
module.exports = router;