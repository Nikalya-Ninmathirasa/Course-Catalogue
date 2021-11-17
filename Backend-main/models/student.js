const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    
    FirstName: {
        type: String,
        required: true,
        trim: true,
        
    },
    LastName: {
        type: String,
        required: true,
        trim: true,
        
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        
    },
    Password: {
        type: String,
        required: true,
        trim: true,
    },
    
})

module.exports = mongoose.model('Student', studentSchema);

 

