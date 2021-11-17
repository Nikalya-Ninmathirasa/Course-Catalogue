const Course = require("../models/course");

exports.newCourse = async (req, res) => {
  const postcourse = new Course({
    course_name: req.body.course_name,
    creatorId: req.body.creatorId,
    mediumofstudy: req.body.mediumofstudy,
    modeofstudy: req.body.modeofstudy,
    fieldofstudy: req.body.fieldofstudy,
    courselevel: req.body.courselevel,
    durationofstudy: req.body.durationofstudy,
    cost: req.body.cost,
    results: req.body.results,
    description: req.body.description,
    image: req.file.path
  });

  try {
    await postcourse.save();
  } catch (error) {
    return res.status(201).json({
      message: `image upload failed, check to see the ${error}`,
      status: "error",
    });
  }
};

// Create New Course =>  /api/course/new
// exports.newCourse = async (req, res) => {

//     const course = await Course.create(req.body)

//         res.status(201).json({
//             success: true,
//             course
//         })
// }

// Get all Course => /api/course

exports.getCourses = async (req, res) => {
  const course = await Course.find();

  res.status(200).json(course);
};

// Get single course details => /api/course/:id

exports.getSingleCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  res.status(200).json({
    success: true,
    course,
  });
};

// Update Course => /api/course/:id

exports.updateCourse = async (req, res) => {

  let course = await Course.findById(req.params.id);

  if(!course) {
      return res.status(404).json({
          success: false, 
          message: 'Course not found'
      })
  }

  course = await Course.findByIdAndUpdate(req.params.id, ({
      course_name: req.body.course_name,
      mediumofstudy: req.body.mediumofstudy,
      modeofstudy: req.body.modeofstudy,
      fieldofstudy: req.body.fieldofstudy,
      courselevel: req.body.courselevel,
      durationofstudy: req.body.durationofstudy,
      cost: req.body.cost,
      results: req.body.results,
      description: req.body.description,
      image: req.file.path
      
    }), {
      new: true,
      runValidators: true,
      useFindAndModify: false
  });

  res.status(200).json({
      success: true,
      course
  })

}

// exports.updateCourse = async (req, res) => {
//   let course = await Course.findById(req.params.id);

//   if (!course) {
//     return res.status(404).json({
//       success: false,
//       message: "Course not found",
//     });
//   }

//   course = await Course.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//     course,
//   });
// };

// Delete Course => /api/course/:id
exports.deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course is deleted",
  });
};
