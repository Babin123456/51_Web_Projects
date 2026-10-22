# Job Application Portal

A modern, accessible, responsive job application form built with vanilla JavaScript, HTML5, and CSS3.

## 📋 Overview

The Job Application Portal provides a clean and intuitive interface for prospective candidates to submit their credentials. It features real-time client-side validation, drag-and-drop resume upload with file type/size verification, LocalStorage draft autosave and restoration, and an accessible confirmation modal.

## ✨ Key Features

- **Client-Side Form Validation**: Structured validator module verifying name format, valid email regex, role selection, address, city, and 5-6 digit PIN/postal codes.
- **LocalStorage Draft Autosave**: Automatically saves form inputs into `localStorage` as the user types, preserving progress against accidental tab closes or page reloads.
- **Drag-and-Drop Resume Upload**: Interactive file dropzone validating PDF, DOC, and DOCX files up to 5MB with dynamic file chip preview and removal button.
- **HTML Attribute & Accessibility Fixes**: Corrected invalid attributes (`row="4"` -> `rows="3"`), resolved orphaned label associations, and added accessible ARIA roles.
- **Confirmation Modal**: Displays candidate application summary upon successful submission.
- **Responsive Layout**: Two-column desktop grid that stacks gracefully into single-column layout on mobile devices.

## 📁 Project Structure

```text
04-Job-Application/
├── index.html       # Semantic form layout, file dropzone, and modal dialog
├── app.js          # Controller managing draft autosave, dropzone, and submission
├── validation.js   # Pure client-side validation rules and regex engines
├── style.css       # Clean responsive design, error states, and modal animations
└── README.md       # Project documentation
```

## 🚀 Getting Started

1. Open `index.html` in any modern web browser.
2. Fill out personal and address details.
3. Drag and drop your resume (or click to browse).
4. Click **Submit Application** to validate and view the submission summary.
