const Advertisement = require('../models/advertisement')

// Create New Advertisement =>  /api/Advertisement/new
// exports.newAdvertisement = async (req, res) => {

//     const advertisement = await Advertisement.create(req.body)
        
//         res.status(201).json({
//             success: true,
//             advertisement
//         })
// }

exports.newAdvertisement = async (req, res) => {
    const advertisement = new Advertisement({
        ad_name: req.body.ad_name,
        creatorId: req.body.creatorId,
        image: req.file.path,
    });
  
    try {
      await advertisement.save();
    } catch (error) {
      return res.status(201).json({
        message: `Advertisment Add failed, check to see the ${error}`,
        status: "error",
      });
    }
  };


// Get all Advertisement => /api/Advertisement

exports.getAdvertisement = async (req, res) => {

    const advertisement = await Advertisement.find();

    res.status(200).json(advertisement)
}

// Get single Advertisement details => /api/Advertisement/:id

exports.getSingleAdvertisement = async (req, res) => {

    const advertisement = await Advertisement.findById(req.params.id);

    if(!advertisement) {
        return res.status(404).json({
            success: false,
            message: 'Advertisement not found'
        })
    }

    res.status(200).json({
        success: true,
        advertisement
    })
}

// Update Advertisement => /api/Advertisement/:id

exports.updateAdvertisement = async (req, res) => {

    let advertisement = await Advertisement.findById(req.params.id);
  
    if(!advertisement) {
        return res.status(404).json({
            success: false, 
            message: 'Advertisment not found'
        })
    }
  
    advertisement = await Advertisement.findByIdAndUpdate(req.params.id, ({
        ad_name: req.body.ad_name,
        image: req.file.path
        
      }), {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
  
    res.status(200).json({
        success: true,
        advertisement
    })
  
  }

// exports.updateAdvertisement = async (req, res) => {

//     let advertisement = await Advertisement.findById(req.params.id);

//     if(!advertisement) {
//         return res.status(404).json({
//             success: false,
//             message: 'Advertisement not found'
//         })
//     }

//     advertisement = await Advertisement.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false
//     });

//     res.status(200).json({
//         success: true,
//         advertisement
//     })

// }

// Delete Advertisement => /api/Advertisement/:id
exports.deleteAdvertisement = async (req, res) => {

    const advertisement = await Advertisement.findByIdAndDelete(req.params.id);

    if(!advertisement) {
        return res.status(404).json({
            success: false,
            message: 'Advertisement not found'
        })
    }

    await advertisement.remove();

    res.status(200).json({
        success: true,
        message: 'Advertisement is deleted'
    })

}