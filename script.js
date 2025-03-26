document.addEventListener('DOMContentLoaded', () => {
    // ... existing modal and form elements ...

    // User State
    let currentUser = null;

    // Check login state on page load
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        updateUIForLoggedInUser();
    }

    // Login Form Handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Simulate login (replace with actual authentication)
        currentUser = {
            name: 'John Doe',
            email: email,
            role: 'entrepreneur'
        };

        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update UI
        updateUIForLoggedInUser();
        closeModal(loginModal);
        alert('Login successful!');
    });

    // Signup Form Handler
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = signupForm.querySelector('input[type="text"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelector('input[type="password"]').value;
        const role = signupForm.querySelector('select').value;

        // Simulate signup (replace with actual registration)
        currentUser = {
            name: name,
            email: email,
            role: role
        };

        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update UI
        updateUIForLoggedInUser();
        closeModal(signupModal);
        alert('Signup successful!');
    });

    // Function to update UI for logged-in user
    function updateUIForLoggedInUser() {
        // Update profile link
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.textContent = `Profile (${currentUser.name})`;
        }

        // Show/hide login/signup buttons
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        if (loginBtn && signupBtn) {
            loginBtn.style.display = 'none';
            signupBtn.style.display = 'none';
        }
    }

    // ... rest of the existing code ...
});
