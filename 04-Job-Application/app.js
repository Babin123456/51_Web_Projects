// Job Application Form Controller with LocalStorage Drafts and File Dropzone
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("job-form");
    const firstNameInput = document.getElementById("first_name");
    const lastNameInput = document.getElementById("last_name");
    const emailInput = document.getElementById("email");
    const jobRoleSelect = document.getElementById("job_role");
    const addressInput = document.getElementById("address");
    const cityInput = document.getElementById("city");
    const pinCodeInput = document.getElementById("pin_code");
    const dateInput = document.getElementById("date");
    const fileInput = document.getElementById("cv-upload");
    const fileDropzone = document.getElementById("file-dropzone");
    const filePreview = document.getElementById("file-preview");
    const successModal = document.getElementById("success-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalSummary = document.getElementById("modal-summary");

    const DRAFT_KEY = "job_application_draft";
    let selectedFile = null;

    // Restore draft from LocalStorage
    function restoreDraft() {
        try {
            const saved = localStorage.getItem(DRAFT_KEY);
            if (!saved) return;
            const data = JSON.parse(saved);

            if (data.firstName && firstNameInput) firstNameInput.value = data.firstName;
            if (data.lastName && lastNameInput) lastNameInput.value = data.lastName;
            if (data.email && emailInput) emailInput.value = data.email;
            if (data.jobRole && jobRoleSelect) jobRoleSelect.value = data.jobRole;
            if (data.address && addressInput) addressInput.value = data.address;
            if (data.city && cityInput) cityInput.value = data.city;
            if (data.pinCode && pinCodeInput) pinCodeInput.value = data.pinCode;
            if (data.date && dateInput) dateInput.value = data.date;
        } catch (e) {
            console.warn("Failed to restore draft:", e);
        }
    }

    // Save draft on user input
    function saveDraft() {
        const draft = {
            firstName: firstNameInput?.value || "",
            lastName: lastNameInput?.value || "",
            email: emailInput?.value || "",
            jobRole: jobRoleSelect?.value || "",
            address: addressInput?.value || "",
            city: cityInput?.value || "",
            pinCode: pinCodeInput?.value || "",
            date: dateInput?.value || ""
        };
        try {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        } catch (e) {
            // LocalStorage error
        }
    }

    // Set error message for an input field
    function setError(inputEl, errorMsg) {
        if (!inputEl) return;
        const parent = inputEl.closest(".form-control") || inputEl.closest(".textarea_control") || inputEl.closest(".file-control");
        if (!parent) return;

        let errEl = parent.querySelector(".error-text");
        if (!errEl) {
            errEl = document.createElement("span");
            errEl.className = "error-text";
            parent.appendChild(errEl);
        }

        if (errorMsg) {
            errEl.textContent = errorMsg;
            parent.classList.add("has-error");
        } else {
            errEl.textContent = "";
            parent.classList.remove("has-error");
        }
    }

    // Clear error
    function clearError(inputEl) {
        setError(inputEl, null);
    }

    // Handle file selection
    function handleFile(file) {
        const error = Validator.validateResume(file);
        if (error) {
            setError(fileDropzone, error);
            selectedFile = null;
            if (filePreview) filePreview.innerHTML = "";
            return;
        }

        clearError(fileDropzone);
        selectedFile = file;
        if (filePreview) {
            filePreview.innerHTML = `
                <div class="file-chip">
                    <span>📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
                    <button type="button" class="remove-file-btn" aria-label="Remove file">&times;</button>
                </div>
            `;
            filePreview.querySelector(".remove-file-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                selectedFile = null;
                fileInput.value = "";
                filePreview.innerHTML = "";
            });
        }
    }

    // Drag and Drop listeners
    if (fileDropzone) {
        ["dragenter", "dragover"].forEach(evt => {
            fileDropzone.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
                fileDropzone.classList.add("dragover");
            });
        });

        ["dragleave", "drop"].forEach(evt => {
            fileDropzone.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
                fileDropzone.classList.remove("dragover");
            });
        });

        fileDropzone.addEventListener("drop", (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        fileDropzone.addEventListener("click", () => {
            if (fileInput) fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });
    }

    // Real-time draft saving
    const inputs = [firstNameInput, lastNameInput, emailInput, jobRoleSelect, addressInput, cityInput, pinCodeInput, dateInput];
    inputs.forEach(inp => {
        if (inp) {
            inp.addEventListener("input", () => {
                clearError(inp);
                saveDraft();
            });
        }
    });

    // Form submission validation
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let hasErrors = false;

            const errFirst = Validator.validateName(firstNameInput.value);
            if (errFirst) { setError(firstNameInput, errFirst); hasErrors = true; }

            const errLast = Validator.validateName(lastNameInput.value);
            if (errLast) { setError(lastNameInput, errLast); hasErrors = true; }

            const errEmail = Validator.validateEmail(emailInput.value);
            if (errEmail) { setError(emailInput, errEmail); hasErrors = true; }

            const errRole = Validator.validateRole(jobRoleSelect.value);
            if (errRole) { setError(jobRoleSelect, errRole); hasErrors = true; }

            const errAddress = Validator.validateAddress(addressInput.value);
            if (errAddress) { setError(addressInput, errAddress); hasErrors = true; }

            const errCity = Validator.validateCity(cityInput.value);
            if (errCity) { setError(cityInput, errCity); hasErrors = true; }

            const errPin = Validator.validatePinCode(pinCodeInput.value);
            if (errPin) { setError(pinCodeInput, errPin); hasErrors = true; }

            const errDate = Validator.validateDate(dateInput.value);
            if (errDate) { setError(dateInput, errDate); hasErrors = true; }

            const errFile = Validator.validateResume(selectedFile);
            if (errFile) { setError(fileDropzone, errFile); hasErrors = true; }

            if (hasErrors) return;

            // Display Success Modal
            if (modalSummary) {
                modalSummary.innerHTML = `
                    <p><strong>Candidate:</strong> ${firstNameInput.value} ${lastNameInput.value}</p>
                    <p><strong>Role:</strong> ${jobRoleSelect.options[jobRoleSelect.selectedIndex].text}</p>
                    <p><strong>Email:</strong> ${emailInput.value}</p>
                    <p><strong>Location:</strong> ${cityInput.value} (${pinCodeInput.value})</p>
                    <p><strong>Resume:</strong> ${selectedFile.name}</p>
                `;
            }

            if (successModal) {
                successModal.classList.add("active");
                successModal.setAttribute("aria-hidden", "false");
            }

            // Reset form and clear draft
            localStorage.removeItem(DRAFT_KEY);
            form.reset();
            selectedFile = null;
            if (filePreview) filePreview.innerHTML = "";
        });
    }

    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener("click", () => {
            successModal.classList.remove("active");
            successModal.setAttribute("aria-hidden", "true");
        });
    }

    restoreDraft();
});
