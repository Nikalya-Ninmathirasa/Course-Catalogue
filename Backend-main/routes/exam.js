
const express = require('express')
const router = express.Router();


const { 
    getExam, 
    newExam, 
    getSingleExam, 
    updateExam, 
    deleteExam

} = require('../controllers/examController')

router.route('/exam/new').post(newExam);

router.route('/exam').get(getExam);

router.route('/exam/:id').get(getSingleExam);

router.route('/exam/:id').put(updateExam);

router.route('/exam/:id').delete(deleteExam);

module.exports = router;