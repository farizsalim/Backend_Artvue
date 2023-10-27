const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send({
        status: 'Successfully',
        message: 'Welcome to Art Vue Server'
    })
})

module.exports = router;