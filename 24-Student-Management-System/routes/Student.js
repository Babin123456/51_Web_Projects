const express = require('express');
const Router = express.Router();
const Students = require('../models/Student');

// GET / - Main welcome page
Router.get('/', (req, res) => {
    res.render('Students/main');
});

// GET /students - List students with search and section filter
Router.get('/students', async (req, res, next) => {
    try {
        const { q, section } = req.query;
        const filter = {};

        if (section && section !== 'ALL') {
            filter.section = section.toUpperCase();
        }

        if (q && q.trim()) {
            const query = q.trim();
            if (!isNaN(query)) {
                filter.$or = [
                    { roll: Number(query) },
                    { name: { $regex: query, $options: 'i' } }
                ];
            } else {
                filter.name = { $regex: query, $options: 'i' };
            }
        }

        const data = await Students.find(filter).sort({ roll: 1 });
        res.render('Students/index', { data, query: q || '', activeSection: section || 'ALL' });
    } catch (err) {
        next(err);
    }
});

// GET /student/new - Show new student creation form
Router.get('/student/new', (req, res) => {
    res.render('Students/new', { error: null });
});

// POST /students - Create student with duplicate roll prevention
Router.post('/students', async (req, res, next) => {
    try {
        const { img, name, roll, section } = req.body;

        // Check if student with roll already exists
        const existing = await Students.findOne({ roll: Number(roll) });
        if (existing) {
            return res.status(400).render('Students/new', {
                error: `A student with Roll Number ${roll} already exists (${existing.name}).`
            });
        }

        await Students.create({
            img: img ? img.trim() : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            name: name.trim(),
            roll: Number(roll),
            section: section.trim().toUpperCase()
        });

        res.redirect('/students');
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).render('Students/new', {
                error: 'Duplicate Roll Number detected. Please use a unique roll number.'
            });
        }
        next(err);
    }
});

// GET /students/:id - Show specific student details populated with marks
Router.get('/students/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const stu = await Students.findById(id).populate('marks');
        if (!stu) {
            return res.status(404).render('Students/404', { message: 'Student record not found' });
        }
        res.render('Students/show', { stu });
    } catch (err) {
        next(err);
    }
});

// GET /students/:id/edit - Show edit student form
Router.get('/students/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const stu = await Students.findById(id);
        if (!stu) {
            return res.status(404).render('Students/404', { message: 'Student record not found' });
        }
        res.render('Students/edit', { stu, error: null });
    } catch (err) {
        next(err);
    }
});

// PATCH /students/:id - Update student record
Router.patch('/students/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { img, name, roll, section } = req.body;

        // Check roll uniqueness against other students
        const duplicate = await Students.findOne({
            roll: Number(roll),
            _id: { $ne: id }
        });

        if (duplicate) {
            const stu = await Students.findById(id);
            return res.status(400).render('Students/edit', {
                stu,
                error: `Roll Number ${roll} is already assigned to another student.`
            });
        }

        await Students.findByIdAndUpdate(id, {
            img: img ? img.trim() : undefined,
            name: name.trim(),
            roll: Number(roll),
            section: section.trim().toUpperCase()
        }, { runValidators: true });

        res.redirect(`/students/${id}`);
    } catch (err) {
        next(err);
    }
});

// DELETE /students/:id - Delete student and cascade marks
Router.delete('/students/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Students.findByIdAndDelete(id);
        res.redirect('/students');
    } catch (err) {
        next(err);
    }
});

module.exports = Router;