const express = require('express');
const router = express.Router();

const { newCareerCounsellor,
        getCareerCounsellor,
        deleteCareerCounsellor,
        updateCareerCounsellor

} = require('../controllers/careerCounsellorController');

const parser = require("../middleware/cloudinary.config");

router.post('/careercounsellor/new', parser.single("image"), newCareerCounsellor);

router.route('/careercounsellor').get(getCareerCounsellor);

router.put('/careercounsellor/update/:id', parser.single("image"), updateCareerCounsellor);

router.route('/careercounsellor/delete/:id').delete(deleteCareerCounsellor);

module.exports = router;