// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset previous error messages
    resetErrors();
    
    // Validate inputs
    let isValid = true;
    
    // Name validation
    if (name === '') {
        showError('nameError', 'Name is required');
        markInvalid('name');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('nameError', 'Name should contain only letters');
        markInvalid('name');
        isValid = false;
    }
    
    // Email validation
    if (email === '') {
        showError('emailError', 'Email is required');
        markInvalid('email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        markInvalid('email');
        isValid = false;
    }
    
    // Message validation
    if (message === '') {
        showError('messageError', 'Message is required');
        markInvalid('message');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message should be at least 10 characters');
        markInvalid('message');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        showSuccessMessage();
        // In a real application, you would send the form data to a server here
        // For now, we'll just log it and reset the form
        console.log('Form submitted:', { name, email, message });
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    }
});

// Helper functions for validation
function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function markInvalid(fieldId) {
    document.getElementById(fieldId).parentElement.classList.add('error');
}

function resetErrors() {
    // Hide all error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Remove error classes
    document.querySelectorAll('.form-group').forEach(el => {
        el.classList.remove('error');
    });
    
    // Hide success message
    document.getElementById('successMessage').style.display = 'none';
}

function showSuccessMessage() {
    const successElement = document.getElementById('successMessage');
    successElement.textContent = 'Thank you! Your message has been sent successfully.';
    successElement.style.display = 'block';
    
    // Mark fields as valid
    document.getElementById('name').parentElement.classList.add('success');
    document.getElementById('email').parentElement.classList.add('success');
    document.getElementById('message').parentElement.classList.add('success');
}

// Real-time validation for better UX
document.getElementById('name').addEventListener('input', function() {
    const name = this.value.trim();
    if (name === '') {
        showError('nameError', 'Name is required');
        markInvalid('name');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('nameError', 'Name should contain only letters');
        markInvalid('name');
    } else {
        document.getElementById('nameError').style.display = 'none';
        this.parentElement.classList.remove('error');
    }
});

document.getElementById('email').addEventListener('input', function() {
    const email = this.value.trim();
    if (email === '') {
        showError('emailError', 'Email is required');
        markInvalid('email');
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        markInvalid('email');
    } else {
        document.getElementById('emailError').style.display = 'none';
        this.parentElement.classList.remove('error');
    }
});

document.getElementById('message').addEventListener('input', function() {
    const message = this.value.trim();
    if (message === '') {
        showError('messageError', 'Message is required');
        markInvalid('message');
    } else if (message.length < 10) {
        showError('messageError', 'Message should be at least 10 characters');
        markInvalid('message');
    } else {
        document.getElementById('messageError').style.display = 'none';
        this.parentElement.classList.remove('error');
    }
});