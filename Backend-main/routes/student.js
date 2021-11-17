
const express = require('express')
const router = express.Router();


const { 
    getStudent, 
    newStudent, 
    getSingleStudent, 
    updateStudent, 
    deleteStudent

} = require('../controllers/studentController')

router.route('/student/new').post(newStudent);

router.route('/student').get(getStudent);

router.route('/student/:id').get(getSingleStudent);

router.route('/student/:id').put(updateStudent);

router.route('/student/:id').delete(deleteStudent);

module.exports = router;          