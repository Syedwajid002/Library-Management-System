const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser); ////https://localhost:3000/api/users/register  ---send name,email,password,role
router.post('/login', loginUser);  //https://localhost:3000/api/users/login  ---send email,password


module.exports = router;
