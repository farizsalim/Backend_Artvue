const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req,res) => {
    res.send({
        status: 'Successfully',
        message: 'Welcome to Art Vue Server'
    })
})
router.post('/register', authController.register);
router.get('/allUser', authController.getAllUsers)
router.put('/user/:IDUser/updateUsername', authController.updateUsername);
router.delete('/user/:IDUser/delete', authController.deleteUser);

module.exports = router;