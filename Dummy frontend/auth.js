/**
 * URIMPACT Authentication Module
 */

// ============================================
// Tab Switching
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const footerText = document.getElementById('footerText');
    const footerLink = document.getElementById('footerLink');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (tab === 'signin') {
                signinForm.classList.add('active');
                signupForm.classList.remove('active');
                footerText.textContent = "Don't have an account?";
                footerLink.textContent = 'Sign Up';
            } else {
                signupForm.classList.add('active');
                signinForm.classList.remove('active');
                footerText.textContent = 'Already have an account?';
                footerLink.textContent = 'Sign In';
            }
        });
    });

    // Form submissions
    signinForm.addEventListener('submit', handleSignIn);
    signupForm.addEventListener('submit', handleSignUp);

    // Password strength checker
    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) {
        signupPassword.addEventListener('input', checkPasswordStrength);
    }
});

// ============================================
// Switch Tab from Footer Link
// ============================================
function switchTab(e) {
    e.preventDefault();
    const currentTab = document.querySelector('.tab-btn.active').dataset.tab;
    const targetTab = currentTab === 'signin' ? 'signup' : 'signin';
    document.querySelector(`.tab-btn[data-tab="${targetTab}"]`).click();
}

// ============================================
// Toggle Password Visibility
// ============================================
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ============================================
// Password Strength Checker
// ============================================
function checkPasswordStrength() {
    const password = this.value;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    strengthBar.classList.remove('weak', 'medium', 'strong');
    
    if (password.length === 0) {
        strengthText.textContent = 'Password strength';
    } else if (strength <= 1) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 2) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Medium strength';
    } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Strong password';
    }
}

// ============================================
// Handle Sign In
// ============================================
function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const submitBtn = this.querySelector('.btn-submit');
    
    // Add loading state
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        // Demo login - accept any email/password
        const user = {
            email: email,
            name: email.split('@')[0],
            firstName: email.split('@')[0].split('.')[0] || 'User',
            lastName: email.split('@')[0].split('.')[1] || '',
            role: 'Admin',
            organization: 'URIMPACT Demo',
            avatar: null,
            loginTime: new Date().toISOString()
        };
        
        // Store user session
        if (rememberMe) {
            localStorage.setItem('urimpact_user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('urimpact_user', JSON.stringify(user));
        }
        
        // Redirect to dashboard
        window.location.href = 'index.html';
    }, 1500);
}

// ============================================
// Handle Sign Up
// ============================================
function handleSignUp(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const organization = document.getElementById('organization').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const submitBtn = this.querySelector('.btn-submit');
    
    // Validation
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        return;
    }
    
    if (!agreeTerms) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    // Add loading state
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        // Create user
        const user = {
            email: email,
            name: `${firstName} ${lastName}`,
            firstName: firstName,
            lastName: lastName,
            role: 'User',
            organization: organization,
            avatar: null,
            loginTime: new Date().toISOString()
        };
        
        // Store user session
        localStorage.setItem('urimpact_user', JSON.stringify(user));
        
        // Show success and redirect
        showSuccessMessage();
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 1500);
}

// ============================================
// Show Error
// ============================================
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const wrapper = input.closest('.input-wrapper');
    
    wrapper.classList.add('error');
    
    // Remove existing error message
    const existingError = wrapper.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    wrapper.parentElement.appendChild(errorDiv);
    
    // Remove error on input
    input.addEventListener('input', function() {
        wrapper.classList.remove('error');
        const error = wrapper.parentElement.querySelector('.error-message');
        if (error) error.remove();
    }, { once: true });
}

// ============================================
// Show Success Message
// ============================================
function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const existingSuccess = form.querySelector('.success-message');
    if (existingSuccess) return;
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Account created successfully! Redirecting...';
    form.insertBefore(successDiv, form.firstChild);
}

// ============================================
// Check Auth Status (for other pages)
// ============================================
function checkAuth() {
    const user = localStorage.getItem('urimpact_user') || sessionStorage.getItem('urimpact_user');
    return user ? JSON.parse(user) : null;
}

// ============================================
// Logout
// ============================================
function logout() {
    localStorage.removeItem('urimpact_user');
    sessionStorage.removeItem('urimpact_user');
    window.location.href = 'login.html';
}

// Export for use in other files
window.checkAuth = checkAuth;
window.logout = logout;
