const express = require('express')
const router = express.Router();

const { 
    getCourses, 
    newCourse, 
    getSingleCourse, 
    updateCourse, 
    deleteCourse

} = require('../controllers/courseController')

const parser = require("../middleware/cloudinary.config");

router.post('/course', parser.single("image"), newCourse);

router.route('/course').get(getCourses);

router.route('/course/:id').get(getSingleCourse);

router.put('/course/update/:id', parser.single("image"), updateCourse);

router.route('/course/delete/:id').delete(deleteCourse);

module.exports = router;