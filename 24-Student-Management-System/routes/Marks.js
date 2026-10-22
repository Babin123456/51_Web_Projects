const express = require('express');
const Router = express.Router();
const Students = require('../models/Student');
const Marks = require('../models/Marks');

// POST /students/:id/marks - Add subject marks for a student
Router.post('/students/:id/marks', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { subject, grade } = req.body;

        if (!subject || grade === undefined || isNaN(grade)) {
            return res.status(400).send('Subject and numeric grade are required.');
        }

        const student = await Students.findById(id);
        if (!student) {
            return res.status(404).render('Students/404', { message: 'Student not found' });
        }

        const newMark = await Marks.create({
            subject: subject.trim(),
            grade: Number(grade)
        });

        student.marks.push(newMark._id);
        await student.save();

        res.redirect(`/students/${id}`);
    } catch (err) {
        next(err);
    }
});

// DELETE /students/:studentId/marks/:markId - Delete a mark entry
Router.delete('/students/:studentId/marks/:markId', async (req, res, next) => {
    try {
        const { studentId, markId } = req.params;

        await Students.findByIdAndUpdate(studentId, {
            $pull: { marks: markId }
        });
        await Marks.findByIdAndDelete(markId);

        res.redirect(`/students/${studentId}`);
    } catch (err) {
        next(err);
    }
});

module.exports = Router;
