const path = require('path');
const express = require('express');
const app = express();
const ejsmate = require('ejs-mate');
const methodOverride = require('method-override');
require('dotenv').config();

const connectDB = require('./config/db');
const studentRoutes = require('./routes/Student');
const markRoutes = require('./routes/Marks');

connectDB();

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(studentRoutes);
app.use(markRoutes);

// 404 Not Found Handler
app.use((req, res) => {
    res.status(404).render('Students/404', { message: 'Page not found' });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Application Error:', err.message || err);
    const status = err.status || 500;
    res.status(status).render('Students/404', {
        message: err.message || 'Something went wrong on the server.'
    });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Student Management System running at http://localhost:${PORT}`);
});