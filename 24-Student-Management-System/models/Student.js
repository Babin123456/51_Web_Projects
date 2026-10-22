const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    img: {
        type: String,
        required: [true, 'Student image URL is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
    roll: {
        type: Number,
        required: [true, 'Roll number is required'],
        unique: true,
        min: [1, 'Roll number must be a positive integer']
    },
    section: {
        type: String,
        required: [true, 'Section is required'],
        trim: true,
        uppercase: true
    },
    marks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marks'
    }]
}, {
    timestamps: true
});

const Students = mongoose.model('Students', studentSchema);
module.exports = Students;