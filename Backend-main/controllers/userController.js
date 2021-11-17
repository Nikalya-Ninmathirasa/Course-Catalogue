const User = require('../models/user')

// Get all Course => /api/course

exports.getUser = async (req, res) => {

    const user = await User.find();

    res.status(200).json(user)
}

// Update Course => /api/course/:id

exports.updateUser = async (req, res) => {

    let user = await User.findById(req.params.id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })

}