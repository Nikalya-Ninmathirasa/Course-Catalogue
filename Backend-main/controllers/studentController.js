const Student = require('../models/student')

// Create New Course =>  /api/course/new
exports.newStudent = async(req, res, next) => {

    const student = await Student.create(req.body)
        
        res.status(201).json({
            success: true,
            student
        })
}


// Get all Course => /api/course

exports.getStudent = async (req, res, next) => {

    const student = await Student.find();

    res.status(200).json(student)
}

// Get single course details => /api/course/:id

exports.getSingleStudent = async (req, res, next) => {

    consstudent = await Student.findById(req.params.id);

    if(!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        })
    }

    res.status(200).json({
        success: true,
        student
    })
}

// Update Course => /api/course/:id

exports.updateStudent = async (req, res, next) => {

    let student = await Student.findById(req.params.id);

    if(!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        })
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        student
    })

}

// Delete Course => /api/course/:id
exports.deleteStudent = async (req, res, next) => {

    const student = await Student.findByIdAndDelete(req.params.id);

    if(!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        })
    }

    await student.remove();

    res.status(200).json({
        success: true,
        message: 'Student is deleted'
    })

}