document.addEventListener('DOMContentLoaded', () => {
    // ... existing modal and form elements ...

    // Additional Button Elements
    const submitPitchBtn = document.getElementById('submitPitchBtn');
    const becomeInvestorBtn = document.getElementById('becomeInvestorBtn');

    // Sample Data
    const pitches = [
        {
            title: 'EcoTech Solutions',
            description: 'Revolutionary green technology for sustainable living',
            investors: 5,
            funding: '$500K',
            image: 'https://via.placeholder.com/300x200',
            details: 'EcoTech Solutions is developing cutting-edge green technology solutions for sustainable living. Our flagship product reduces carbon emissions by 40% while maintaining high performance standards.'
        },
        {
            title: 'HealthTech Pro',
            description: 'AI-powered healthcare solutions for better patient care',
            investors: 3,
            funding: '$750K',
            image: 'https://via.placeholder.com/300x200',
            details: 'HealthTech Pro leverages artificial intelligence to improve patient care and streamline healthcare operations. Our platform has already helped over 10,000 patients.'
        },
        {
            title: 'FinTech Innovator',
            description: 'Next-generation financial technology platform',
            investors: 7,
            funding: '$1.2M',
            image: 'https://via.placeholder.com/300x200',
            details: 'FinTech Innovator is revolutionizing the financial industry with our blockchain-based platform. We offer secure, transparent, and efficient financial services.'
        }
    ];

    const investors = [
        {
            name: 'G.Lohith',
            title: 'Tech Entrepreneur',
            investments: 15,
            funding: '$2M+',
            image: 'https://via.placeholder.com/150',
            bio: 'Serial entrepreneur with expertise in technology and innovation.'
        },
        {
            name: 'T.Niranjan',
            title: 'Venture Capitalist',
            investments: 25,
            funding: '$5M+',
            image: 'https://via.placeholder.com/150',
            bio: 'Leading venture capitalist with a focus on disruptive technologies.'
        },
        {
            name: 'M.Praveen',
            title: 'Angel Investor',
            investments: 12,
            funding: '$1.5M+',
            image: 'https://github.com/Lucifeet-007/Idea_in_action/issues/1#issue-2948340970',
            bio: 'Angel investor specializing in early-stage startups.'
        }
    ];

    // ... existing modal functions ...

    // Pitch Submission Function
    function handlePitchSubmission() {
        if (!currentUser) {
            alert('Please login to submit a pitch');
            openModal(loginModal);
            return;
        }

        const pitchModal = document.createElement('div');
        pitchModal.className = 'modal';
        pitchModal.id = 'pitchSubmissionModal';
        pitchModal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Submit Your Pitch</h2>
                <form id="pitchSubmissionForm">
                    <div class="form-group">
                        <input type="text" placeholder="Pitch Title" required>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="Pitch Description" required></textarea>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Funding Amount Needed" required>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="Detailed Business Plan" required></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Submit Pitch</button>
                </form>
            </div>
        `;
        document.body.appendChild(pitchModal);
        openModal(pitchModal);

        // Handle pitch submission
        const pitchForm = document.getElementById('pitchSubmissionForm');
        pitchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pitch submitted successfully! We will review it and get back to you soon.');
            closeModal(pitchModal);
            pitchModal.remove();
        });
    }

    // Investor Registration Function
    function handleInvestorRegistration() {
        if (!currentUser) {
            alert('Please login to register as an investor');
            openModal(loginModal);
            return;
        }

        const investorModal = document.createElement('div');
        investorModal.className = 'modal';
        investorModal.id = 'investorRegistrationModal';
        investorModal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Become an Investor</h2>
                <form id="investorRegistrationForm">
                    <div class="form-group">
                        <input type="text" placeholder="Company Name" required>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Investment Capacity" required>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="Investment Focus Areas" required></textarea>
                    </div>
                    <div class="form-group">
                        <input type="file" accept=".pdf,.doc,.docx" required>
                    </div>
                    <button type="submit" class="btn-primary">Register as Investor</button>
                </form>
            </div>
        `;
        document.body.appendChild(investorModal);
        openModal(investorModal);

        // Handle investor registration
        const investorForm = document.getElementById('investorRegistrationForm');
        investorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Investor registration submitted successfully! We will review your application.');
            closeModal(investorModal);
            investorModal.remove();
        });
    }

    // View Pitch Details Function
    function viewPitchDetails(pitch) {
        if (!currentUser) {
            alert('Please login to view pitch details');
            openModal(loginModal);
            return;
        }

        const pitchModal = document.createElement('div');
        pitchModal.className = 'modal';
        pitchModal.id = 'pitchDetailsModal';
        pitchModal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${pitch.title}</h2>
                <div class="pitch-details">
                    <img src="${pitch.image}" alt="${pitch.title}" style="width: 100%; margin-bottom: 20px;">
                    <p><strong>Description:</strong> ${pitch.description}</p>
                    <p><strong>Detailed Information:</strong> ${pitch.details}</p>
                    <div class="pitch-stats">
                        <span><i class="fas fa-users"></i> ${pitch.investors} Investors</span>
                        <span><i class="fas fa-dollar-sign"></i> ${pitch.funding}</span>
                    </div>
                    <button class="btn-primary" onclick="bookMeeting('${pitch.title}')">Schedule Meeting</button>
                </div>
            </div>
        `;
        document.body.appendChild(pitchModal);
        openModal(pitchModal);
    }

    // Update loadPitches function
    function loadPitches() {
        const pitchGrid = document.querySelector('.pitch-grid');
        pitchGrid.innerHTML = '';

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
                    <button class="btn-primary" onclick="viewPitchDetails(${JSON.stringify(pitch).replace(/"/g, '&quot;')})">View Pitch</button>
                </div>
            `;
            pitchGrid.appendChild(pitchCard);
        });
    }

    // Event Listeners for new buttons
    submitPitchBtn.addEventListener('click', handlePitchSubmission);
    becomeInvestorBtn.addEventListener('click', handleInvestorRegistration);

    // Make functions available globally
    window.viewPitchDetails = viewPitchDetails;
    window.bookMeeting = (pitchTitle) => {
        document.getElementById('meetingTitle').value = `Meeting for ${pitchTitle}`;
        openModal(bookMeetingModal);
    };

    // ... rest of the existing code ...
});
