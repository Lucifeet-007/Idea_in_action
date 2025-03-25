document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const bookMeetingModal = document.getElementById('bookMeetingModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const meetingsLink = document.getElementById('meetingsLink');
    const closeBtns = document.querySelectorAll('.close');

    // Form Elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const bookMeetingForm = document.getElementById('bookMeetingForm');

    // User State
    let currentUser = null;
    let meetings = [];

    // Sample Data
    const pitches = [
        {
            title: 'EcoTech Solutions',
            description: 'Revolutionary green technology for sustainable living',
            investors: 5,
            funding: '$500K',
            image: 'https://via.placeholder.com/300x200'
        },
        {
            title: 'HealthTech Pro',
            description: 'AI-powered healthcare solutions for better patient care',
            investors: 3,
            funding: '$750K',
            image: 'https://via.placeholder.com/300x200'
        },
        {
            title: 'FinTech Innovator',
            description: 'Next-generation financial technology platform',
            investors: 7,
            funding: '$1.2M',
            image: 'https://via.placeholder.com/300x200'
        }
    ];

    const investors = [
        {
            name: 'John Smith',
            title: 'Tech Entrepreneur',
            investments: 15,
            funding: '$2M+',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'Sarah Johnson',
            title: 'Venture Capitalist',
            investments: 25,
            funding: '$5M+',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'Michael Chen',
            title: 'Angel Investor',
            investments: 12,
            funding: '$1.5M+',
            image: 'https://via.placeholder.com/150'
        }
    ];

    // Modal Functions
    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Authentication Functions
    function login(email, password) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, this would validate against a backend
                currentUser = {
                    email,
                    name: email.split('@')[0],
                    role: 'entrepreneur' // This would come from the backend
                };
                localStorage.setItem('user', JSON.stringify(currentUser));
                resolve(currentUser);
            }, 1000);
        });
    }

    function logout() {
        currentUser = null;
        localStorage.removeItem('user');
        updateUIForLoggedOutUser();
    }

    function checkAuth() {
        const user = localStorage.getItem('user');
        if (user) {
            currentUser = JSON.parse(user);
            updateUIForLoggedInUser();
        }
    }

    // UI Update Functions
    function updateUIForLoggedInUser() {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        meetingsLink.style.display = 'block';
        document.getElementById('submitPitchBtn').disabled = false;
        document.getElementById('becomeInvestorBtn').disabled = false;
    }

    function updateUIForLoggedOutUser() {
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        meetingsLink.style.display = 'none';
        document.getElementById('submitPitchBtn').disabled = true;
        document.getElementById('becomeInvestorBtn').disabled = true;
        document.getElementById('meetings').style.display = 'none';
    }

    // Meeting Functions
    function addMeeting(meeting) {
        meetings.push({
            ...meeting,
            id: Date.now(),
            status: 'scheduled',
            createdBy: currentUser.email
        });
        localStorage.setItem('meetings', JSON.stringify(meetings));
        loadMeetings();
    }

    function loadMeetings() {
        const meetingsList = document.querySelector('.meetings-list');
        meetingsList.innerHTML = '';

        const userMeetings = meetings.filter(meeting => 
            meeting.createdBy === currentUser.email || currentUser.role === 'admin'
        );

        userMeetings.forEach(meeting => {
            const meetingCard = document.createElement('div');
            meetingCard.className = 'meeting-card';
            meetingCard.innerHTML = `
                <div class="meeting-header">
                    <h3 class="meeting-title">${meeting.title}</h3>
                    <span class="meeting-type">${meeting.type}</span>
                </div>
                <div class="meeting-details">
                    <p><i class="fas fa-calendar"></i> ${new Date(meeting.dateTime).toLocaleString()}</p>
                    <p><i class="fas fa-info-circle"></i> ${meeting.description}</p>
                </div>
                <div class="meeting-actions">
                    <span class="meeting-status status-${meeting.status}">${meeting.status}</span>
                    ${meeting.status === 'scheduled' ? `
                        <button class="btn-secondary" onclick="cancelMeeting(${meeting.id})">Cancel</button>
                    ` : ''}
                </div>
            `;
            meetingsList.appendChild(meetingCard);
        });
    }

    // Event Listeners
    loginBtn.addEventListener('click', () => openModal(loginModal));
    signupBtn.addEventListener('click', () => openModal(signupModal));
    logoutBtn.addEventListener('click', logout);

    meetingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('meetings').style.display = 'block';
        loadMeetings();
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(loginModal);
            closeModal(signupModal);
            closeModal(bookMeetingModal);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === signupModal) closeModal(signupModal);
        if (e.target === bookMeetingModal) closeModal(bookMeetingModal);
    });

    // Form Submissions
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            await login(email, password);
            alert('Login successful!');
            closeModal(loginModal);
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: signupForm.querySelector('input[type="text"]').value,
            email: signupForm.querySelector('input[type="email"]').value,
            password: signupForm.querySelector('input[type="password"]').value,
            role: signupForm.querySelector('select').value
        };

        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', formData);
        alert('Account created successfully!');
        closeModal(signupModal);
    });

    bookMeetingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Please login to book a meeting');
            return;
        }

        const meetingData = {
            title: document.getElementById('meetingTitle').value,
            dateTime: document.getElementById('meetingDateTime').value,
            description: document.getElementById('meetingDescription').value,
            type: document.getElementById('meetingType').value
        };

        addMeeting(meetingData);
        closeModal(bookMeetingModal);
        bookMeetingForm.reset();
    });

    // Load initial content
    checkAuth();
    loadPitches();
    loadInvestors();

    // Make functions available globally
    window.cancelMeeting = (meetingId) => {
        meetings = meetings.map(meeting => 
            meeting.id === meetingId ? { ...meeting, status: 'cancelled' } : meeting
        );
        localStorage.setItem('meetings', JSON.stringify(meetings));
        loadMeetings();
    };
});
