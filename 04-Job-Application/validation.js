// Client-Side Form Validation Module for Job Application
const Validator = {
    validateName(name) {
        if (!name || name.trim().length < 2) {
            return "Name must be at least 2 characters long.";
        }
        if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
            return "Name contains invalid characters.";
        }
        return null;
    },

    validateEmail(email) {
        if (!email || email.trim().length === 0) {
            return "Email is required.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return "Please enter a valid email address.";
        }
        return null;
    },

    validateRole(role) {
        if (!role || role.trim() === "") {
            return "Please select a job role.";
        }
        return null;
    },

    validateAddress(address) {
        if (!address || address.trim().length < 5) {
            return "Address must be at least 5 characters long.";
        }
        return null;
    },

    validateCity(city) {
        if (!city || city.trim().length < 2) {
            return "City must be at least 2 characters.";
        }
        return null;
    },

    validatePinCode(pincode) {
        if (!pincode || String(pincode).trim().length === 0) {
            return "Pin code is required.";
        }
        if (!/^\d{5,6}$/.test(String(pincode).trim())) {
            return "Pin code must be 5 or 6 digits.";
        }
        return null;
    },

    validateDate(dateStr) {
        if (!dateStr) {
            return "Start date is required.";
        }
        return null;
    },

    validateResume(file) {
        if (!file) {
            return "Please upload your CV/Resume.";
        }
        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        const ext = file.name.split(".").pop().toLowerCase();
        if (!allowedTypes.includes(file.type) && !["pdf", "doc", "docx"].includes(ext)) {
            return "Only PDF, DOC, or DOCX files are allowed.";
        }
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return "File size exceeds 5MB limit.";
        }
        return null;
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Validator };
}
