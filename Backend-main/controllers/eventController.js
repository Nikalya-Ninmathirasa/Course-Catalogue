const Event = require('../models/event')

// Create New Course =>  /api/course/new

exports.newEvent = async (req, res) => {
    const event = new Event({
        title: req.body.title,
        creatorId: req.body.creatorId,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        registrationurl: req.body.registrationurl,
        description: req.body.description,
        fee: req.body.fee,
        image: req.file.path,
    });
  
    try {
      await event.save();
    } catch (error) {
      return res.status(201).json({
        message: `Event Add failed, check to see the ${error}`,
        status: "error",
      });
    }
  };
  

// exports.newEvent = async(req, res, next) => {

//     const event = await Event.create(req.body)
        
//         res.status(201).json({
//             success: true,
//             event
//         })
// }


// Get all Course => /api/course

exports.getEvent = async (req, res, next) => {

    const event = await Event.find();

    res.status(200).json(event)
}

// Get single course details => /api/course/:id

exports.getSingleEvent = async (req, res, next) => {

    const event = await Event.findById(req.params.id);

    if(!event) {
        return res.status(404).json({
            success: false,
            message: 'Event not found'
        })
    }

    res.status(200).json({
        success: true,
        event
    })
}

// Update Course => /api/course/:id

exports.updateEvent = async (req, res) => {

    let event = await Event.findById(req.params.id);
  
    if(!event) {
        return res.status(404).json({
            success: false, 
            message: 'Event not found'
        })
    }
  
    event = await Event.findByIdAndUpdate(req.params.id, ({
        title: req.body.title,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        registrationurl: req.body.registrationurl,
        description: req.body.description,
        fee: req.body.fee,
        image: req.file.path
        
      }), {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
  
    res.status(200).json({
        success: true,
        event
    })
  
  }

// exports.updateEvent = async (req, res, next) => {

//     let event = await Event.findById(req.params.id);

//     if(!event) {
//         return res.status(404).json({
//             success: false,
//             message: 'Event not found'
//         })
//     }

//     event = await Event.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false
//     });

//     res.status(200).json({
//         success: true,
//         event
//     })

// }

// Delete Course => /api/course/:id
exports.deleteEvent = async (req, res, next) => {

    const event = await Event.findByIdAndDelete(req.params.id);

    if(!event) {
        return res.status(404).json({
            success: false,
            message: 'Event not found'
        })
    }

    await event.remove();

    res.status(200).json({
        success: true,
        message: 'Event is deleted'
    })

}