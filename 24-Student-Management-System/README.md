# Student Management System

A full-stack MVC student records and grade management web application built with Node.js, Express, MongoDB (Mongoose), and EJS.

## 📋 Overview

The Student Management System provides an administrative directory for managing student profiles and academic performance. This release fixes database schema bypass issues, enforces roll number uniqueness, links the previously orphaned `Marks` collection, and adds student search and section filtering.

## ✨ Key Features

- **Schema Validation & Uniqueness**: Switched raw driver calls (`insertOne`) to Mongoose `Students.create()` and enforced a unique index on `roll` numbers to prevent data corruption.
- **Academic Marks & Grade Tracking**: Fully wired `Marks` sub-routes allowing administrators to add, display, and delete individual subject test scores per student.
- **Search & Section Filtering**: Search for students dynamically by name or roll number, and filter records by classroom section (Section A, B, C).
- **Environment Configuration**: Replaced hardcoded ports and connection strings with `.env` configuration via `dotenv`.
- **Centralized Error Handling**: Added a custom 404 page and global error handler middleware.
- **Responsive Layout**: Replaced rigid card widths with modern responsive Bootstrap grid columns.

## 📁 Project Structure

```text
24-Student-Management-System/
├── config/
│   └── db.js            # MongoDB Mongoose connection
├── models/
│   ├── Student.js       # Student schema with unique roll and marks array
│   └── Marks.js         # Marks schema with subject and grade validation
├── routes/
│   ├── Student.js       # Student CRUD routes with search & filter
│   └── Marks.js         # Student marks sub-routes
├── views/
│   └── Students/
│       ├── layouts/     # EJS Boilerplate layout
│       ├── partials/    # Navigation bar
│       ├── 404.ejs      # Error and not found page
│       ├── edit.ejs     # Edit student form with error alerts
│       ├── index.ejs    # Student directory with search & filters
│       ├── main.ejs     # Welcome landing page
│       ├── new.ejs      # Register student form
│       └── show.ejs     # Detailed profile & grades table
├── .env.example         # Environment template
├── package.json         # Dependencies and scripts
├── server.js            # Express application bootstrap
└── README.md            # Project documentation
```

## 🚀 Getting Started

1. Navigate to the project directory:
   ```bash
   cd 24-Student-Management-System
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm start
   # or node server.js
   ```
5. Open your browser at `http://localhost:5050`.
