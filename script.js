// API Endpoints
const API_BASE_URL = 'http://localhost:8080/api';

// Global Variables
let currentUser = null;
const investors = [
    { id: 1, name: 'Rajesh Kumar', role: 'Angel Investor & Tech Entrepreneur' },
    { id: 2, name: 'Priya Sharma', role: 'VC Partner & Startup Mentor' },
    { id: 3, name: 'Amit Patel', role: 'Serial Entrepreneur & Investor' },
    { id: 4, name: 'Neha Gupta', role: 'Tech Investor & Innovation Expert' },
    { id: 5, name: 'Arun Reddy', role: 'FinTech Investor & Advisor' },
    { id: 6, name: 'Meera Singh', role: 'Healthcare & Biotech Investor' }
];

// DOM Elements
const navbar = document.querySelector('.navbar');
const profileLink = document.getElementById('profile-link');
const loginBtn = document.getElementById('login-btn');
const bookingModal = document.getElementById('booking-modal');
const investorNameSpan = document.getElementById('investor-name');
const bookingForm = document.getElementById('booking-form');

// API Functions
async function apiRequest(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth Functions
async function login(email, password) {
    try {
        const response = await apiRequest('/auth/login', 'POST', { email, password });
        currentUser = response.user;
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        return true;
    } catch (error) {
        alert('Login failed: ' + error.message);
        return false;
    }
}

async function register(userData) {
    try {
        const response = await apiRequest('/auth/register', 'POST', userData);
        currentUser = response.user;
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        return true;
    } catch (error) {
        alert('Registration failed: ' + error.message);
        return false;
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateUIForLoggedInUser();
}

// UI Functions
function updateUIForLoggedInUser() {
    if (currentUser) {
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = logout;
        profileLink.style.display = 'inline-block';
        profileLink.href = '/profile.html';
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = showLoginModal;
        profileLink.style.display = 'none';
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Modal Functions
function showLoginModal() {
    const email = prompt('Enter your email:');
    if (!email) return;
    
    const password = prompt('Enter your password:');
    if (!password) return;
    
    login(email, password);
}

function bookMeeting(investorId) {
    if (!currentUser) {
        alert('Please login to book a meeting');
        showLoginModal();
        return;
    }

    const investor = investors.find(i => i.id === investorId);
    if (investor) {
        investorNameSpan.textContent = investor.name;
        bookingModal.classList.add('show');
    }
}

function closeModal() {
    bookingModal.classList.remove('show');
}

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeModal();
    }
});

// Form Handling
async function handleBooking(event) {
    event.preventDefault();
    
    if (!currentUser) {
        alert('Please login to book a meeting');
        showLoginModal();
        return;
    }

    const formData = new FormData(bookingForm);
    const bookingData = {
        investorId: parseInt(investorNameSpan.dataset.id),
        date: formData.get('date'),
        timeSlot: formData.get('timeSlot'),
        description: formData.get('description'),
        paymentDetails: {
            cardNumber: formData.get('cardNumber'),
            expiryDate: formData.get('expiryDate'),
            cvv: formData.get('cvv')
        }
    };

    try {
        await apiRequest('/meetings/book', 'POST', bookingData);
        alert('Meeting booked successfully! You will receive a confirmation email shortly.');
        closeModal();
        bookingForm.reset();
    } catch (error) {
        alert('Booking failed: ' + error.message);
    }
}

// Input Formatting
document.querySelector('input[placeholder="1234 5678 9012 3456"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
});

document.querySelector('input[placeholder="MM/YY"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

document.querySelector('input[placeholder="123"]').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

// Set minimum date for date input
const dateInput = document.querySelector('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// Profile Link Handler
profileLink.addEventListener('click', function(e) {
    if (!currentUser) {
        e.preventDefault();
        alert('Please login to view your profile');
        showLoginModal();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }

    // Add form submit handler
    bookingForm.addEventListener('submit', handleBooking);
});
