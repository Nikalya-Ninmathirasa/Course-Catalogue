
const express = require('express')
const router = express.Router();


const { 
    getEvent, 
    newEvent, 
    getSingleEvent, 
    updateEvent, 
    deleteEvent

} = require('../controllers/eventController')

const parser = require("../middleware/cloudinary.config");

router.post('/event/new', parser.single("image"), newEvent);

router.route('/event').get(getEvent);

router.route('/event/:id').get(getSingleEvent);

router.put('/event/:id', parser.single("image"), updateEvent);

router.route('/event/:id').delete(deleteEvent);

module.exports = router;