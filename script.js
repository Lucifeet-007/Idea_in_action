document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const closeBtns = document.querySelectorAll('.close');

    // Form Elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

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
            name: 'G.Lohith',
            title: 'Tech Entrepreneur',
            investments: 15,
            funding: '$2M+',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'T.Niranjan',
            title: 'Venture Capitalist',
            investments: 25,
            funding: '$5M+',
            image: 'https://via.placeholder.com/150'
        },
        {
            name: 'M.Praveen',
            title: 'Angel Investor',
            investments: 12,
            funding: '$1.5M+',
            image: 'https://github.com/Lucifeet-007/Idea_in_action/issues/1#issue-2948340970'
        }
    ];

    // Modal Functions
    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Event Listeners for Modals
    loginBtn.addEventListener('click', () => openModal(loginModal));
    signupBtn.addEventListener('click', () => openModal(signupModal));

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(loginModal);
            closeModal(signupModal);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === signupModal) closeModal(signupModal);
    });

    // Form Submissions
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password });
        alert('Login successful!');
        closeModal(loginModal);
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

    // Dynamic Content Loading
    function loadPitches() {
        const pitchGrid = document.querySelector('.pitch-grid');
        pitchGrid.innerHTML = ''; // Clear existing content

        pitches.forEach(pitch => {
            const pitchCard = document.createElement('div');
            pitchCard.className = 'pitch-card';
            pitchCard.innerHTML = `
                <div class="pitch-image">
                    <img src="${pitch.image}" alt="${pitch.title}">
                </div>
                <div class="pitch-content">
                    <h3>${pitch.title}</h3>
                    <p>${pitch.description}</p>
                    <div class="pitch-stats">
                        <span><i class="fas fa-users"></i> ${pitch.investors} Investors</span>
                        <span><i class="fas fa-dollar-sign"></i> ${pitch.funding}</span>
                    </div>
                    <button class="btn-primary">View Pitch</button>
                </div>
            `;
            pitchGrid.appendChild(pitchCard);
        });
    }

    function loadInvestors() {
        const investorGrid = document.querySelector('.investor-grid');
        investorGrid.innerHTML = ''; // Clear existing content

        investors.forEach(investor => {
            const investorCard = document.createElement('div');
            investorCard.className = 'investor-card';
            investorCard.innerHTML = `
                <div class="investor-image">
                    <img src="${investor.image}" alt="${investor.name}">
                </div>
                <div class="investor-content">
                    <h3>${investor.name}</h3>
                    <p>${investor.title}</p>
                    <div class="investor-stats">
                        <span><i class="fas fa-briefcase"></i> ${investor.investments} Investments</span>
                        <span><i class="fas fa-dollar-sign"></i> ${investor.funding}</span>
                    </div>
                </div>
            `;
            investorGrid.appendChild(investorCard);
        });
    }

    // Load initial content
    loadPitches();
    loadInvestors();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
