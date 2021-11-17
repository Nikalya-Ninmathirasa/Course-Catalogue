const Exam = require('../models/exam')

// Create New Course =>  /api/course/new
exports.newExam = async(req, res) => {

    const exam = await Exam.create(req.body)
        
        res.status(201).json({
            success: true,
            exam
        })
}


// Get all Course => /api/course

exports.getExam = async (req, res) => {

    const exam = await Exam.find();

    res.status(200).json(exam)
}

// Get single course details => /api/course/:id

exports.getSingleExam = async (req, res) => {

    const exam = await Exam.findById(req.params.id);

    if(!exam) {
        return res.status(404).json({
            success: false,
            message: 'Exam not found'
        })
    }

    res.status(200).json({
        success: true,
        exam
    })
}

// Update Course => /api/course/:id

exports.updateExam = async (req, res) => {

    let exam = await Exam.findById(req.params.id);

    if(!exam) {
        return res.status(404).json({
            success: false,
            message: 'Exam not found'
        })
    }

    exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        exam
    })

}

// Delete Course => /api/course/:id
exports.deleteExam = async (req, res) => {

    const exam = await Exam.findByIdAndDelete(req.params.id);

    if(!exam) {
        return res.status(404).json({
            success: false,
            message: 'Exam not found'
        })
    }

    await exam.remove();

    res.status(200).json({
        success: true,
        message: 'Exam is deleted'
    })

}