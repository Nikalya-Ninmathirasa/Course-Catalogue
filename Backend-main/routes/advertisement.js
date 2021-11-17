const express = require('express')
const router = express.Router();

const { 
    getAdvertisement, 
    newAdvertisement, 
    getSingleAdvertisement, 
    updateAdvertisement, 
    deleteAdvertisement

} = require('../controllers/advertismentController')

const parser = require("../middleware/cloudinary.config");

router.post('/ad/new', parser.single("image"), newAdvertisement);

router.route('/ad').get(getAdvertisement);

router.route('/ad/:id').get(getSingleAdvertisement);

router.put('/ad/update/:id', parser.single("image"), updateAdvertisement);

router.route('/ad/delete/:id').delete(deleteAdvertisement);

module.exports = router;