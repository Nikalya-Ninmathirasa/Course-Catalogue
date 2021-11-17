
const express = require('express')
const router = express.Router();


const { 
    getInstitute, 
    newInstitute, 
    getSingleInstitute, 
    updateInstitute, 
    deleteInstitute

} = require('../controllers/instituteController')

const parser = require("../middleware/cloudinary.config");

router.post('/institute/new', parser.single("image"), newInstitute);

router.route('/institute').get(getInstitute);

router.route('/institute/:id').get(getSingleInstitute);

router.put('/institute/:id', parser.single("image"), updateInstitute);

router.route('/institute/:id').delete(deleteInstitute);

module.exports = router;          