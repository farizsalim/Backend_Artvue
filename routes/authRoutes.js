const express = require('express');
const authrouter = express.Router();
const authController = require('../controllers/authController');

authrouter.post('/register', authController.register);
authrouter.get('/allUser', authController.getAllUsers)
authrouter.put('/user/:IDUser/updateUsername', authController.updateUsername);
authrouter.delete('/user/:IDUser/delete', authController.deleteUser);

module.exports = authrouter;