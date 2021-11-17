const express = require('express')
const router = express.Router();

const { 
    newUser, 
    getUser,
    updateUser

} = require('../controllers/userController')

router.route('/user').get(getUser);

router.route('/user/update/:id').put(updateUser);


module.exports = router;