document.addEventListener('DOMContentLoaded', () => {
    // Utility function for smooth scrolling
    function setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-left a, .nav-right a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Planet animation (cycles every 4 seconds)
    function setupPlanetAnimation() {
        const planets = document.querySelectorAll('.planet');
        let currentPlanet = 0;

        function changePlanet() {
            if (planets.length === 0) return;
            planets[currentPlanet].classList.remove('active');
            currentPlanet = (currentPlanet + 1) % planets.length;
            planets[currentPlanet].classList.add('active');
        }

        if (planets.length > 0) {
            planets[0].classList.add('active');
            setInterval(changePlanet, 4000);
        }
    }

    // Newsletter form submission
    function setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    alert(`Thank you for subscribing with ${email}! You'll receive weekly space updates.`);
                    newsletterForm.reset();
                } else {
                    alert('Please enter a valid email address.');
                    emailInput.focus();
                }
            });
        }
    }

    // Join form submission
    function setupJoinForm() {
        const joinForm = document.querySelector('.join-form');
        if (joinForm) {
            joinForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameInput = joinForm.querySelector('input[type="text"]');
                const emailInput = joinForm.querySelector('input[type="email"]');
                const messageInput = joinForm.querySelector('textarea');
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const message = messageInput.value.trim();

                if (name && email && message && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    alert(`Message sent from ${name} (${email}): ${message}`);
                    joinForm.reset();
                } else {
                    alert('Please fill out all fields with valid information.');
                    if (!name) nameInput.focus();
                    else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) emailInput.focus();
                    else if (!message) messageInput.focus();
                }
            });
        }
    }

    // Explore button scroll
    function setupExploreButton() {
        const exploreBtn = document.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                const featuredSection = document.getElementById('featured');
                if (featuredSection) {
                    featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }

    // View All button interaction
    function setupViewAllButton() {
        const viewAllBtn = document.querySelector('.view-all-btn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                alert('Redirecting to blog page...');
                // Optionally: window.location.href = '/blog';
            });
        }
    }

    // Partner logos hover effect
    function setupPartnerLogos() {
        const partnerLogos = document.querySelectorAll('.logos img');
        partnerLogos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'scale(1.2)';
            });
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'scale(1)';
            });
        });
    }

    // Moon Phase Calculator logic
    function calculateMoonPhase(card) {
        const dateInput = card.querySelector('#moon-phase-date');
        const result = card.querySelector('#moon-phase-result');
        const visual = card.querySelector('#moon-phase-visual');

        if (!dateInput || !result) {
            alert('Error: Moon Phase Calculator elements not found.');
            console.error('Missing elements:', { dateInput, result });
            return;
        }

        if (!dateInput.value) {
            result.textContent = 'Please select a valid date.';
            dateInput.focus();
            return;
        }

        const date = new Date(dateInput.value);
        if (isNaN(date.getTime())) {
            result.textContent = 'Invalid date format. Please try again.';
            dateInput.focus();
            return;
        }

        try {
            const cycle = 29.53; // Lunar cycle in days
            const knownNewMoon = new Date('2025-01-01').getTime();
            const diff = (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
            const phase = diff % cycle;
            let phaseName = 'Calculating...';
            let shadowStyle = '';

            if (phase < 1.5) {
                phaseName = 'New Moon';
                shadowStyle = 'radial-gradient(circle, #333 50%, #ccc 50%)';
            } else if (phase < 7.4) {
                phaseName = 'Waxing Crescent';
                shadowStyle = 'radial-gradient(circle at 70% 50%, #ccc 50%, #333 50%)';
            } else if (phase < 8.9) {
                phaseName = 'First Quarter';
                shadowStyle = 'linear-gradient(to right, #ccc 50%, #333 50%)';
            } else if (phase < 14.8) {
                phaseName = 'Waxing Gibbous';
                shadowStyle = 'radial-gradient(circle at 30% 50%, #ccc 50%, #333 50%)';
            } else if (phase < 16.3) {
                phaseName = 'Full Moon';
                shadowStyle = 'radial-gradient(circle, #ccc 100%)';
            } else if (phase < 22.2) {
                phaseName = 'Waning Gibbous';
                shadowStyle = 'radial-gradient(circle at 70% 50%, #333 50%, #ccc 50%)';
            } else if (phase < 23.7) {
                phaseName = 'Last Quarter';
                shadowStyle = 'linear-gradient(to left, #ccc 50%, #333 50%)';
            } else {
                phaseName = 'Waning Crescent';
                shadowStyle = 'radial-gradient(circle at 30% 50%, #333 50%, #ccc 50%)';
            }

            result.textContent = `Moon Phase: ${phaseName}`;
            if (visual) {
                visual.style.background = shadowStyle;
            } else {
                console.warn('Moon phase visual element not found.');
            }
        } catch (error) {
            result.textContent = 'Error calculating moon phase.';
            console.error('Moon phase error:', error);
        }
    }

    // NASA APOD fetch logic
    function fetchNasaAPOD(card) {
        const apod = card.querySelector('#nasa-apod-content');
        if (!apod) {
            alert('Error: NASA APOD content element not found.');
            console.error('Missing APOD content element');
            return;
        }

        apod.innerHTML = '<p>Loading...</p>';

        // Fallback data for testing
        const fallbackData = {
            title: 'Sample APOD Image',
            url: 'https://apod.nasa.gov/apod/image/2410/NGC4753_Hubble_960.jpg',
            explanation: 'This is a sample NASA APOD image for testing purposes.',
        };

        fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                apod.innerHTML = `
                    <h4>${data.title}</h4>
                    <img src="${data.url}" alt="${data.title}">
                    <p>${data.explanation.substring(0, 40)}...</p>
                    <a href="${data.url}" target="_blank" aria-label="View full NASA image">View Full Image</a>
                `;
            })
            .catch(error => {
                console.error('APOD fetch error:', error);
                apod.innerHTML = `
                    <h4>${fallbackData.title}</h4>
                    <img src="${fallbackData.url}" alt="${fallbackData.title}">
                    <p>${fallbackData.explanation.substring(0, 40)}...</p>
                    <a href="${fallbackData.url}" target="_blank" aria-label="View full NASA image">View Full Image</a>
                `;
                alert('Failed to load APOD. Showing sample data. Please check API key or network.');
            });
    }

    // Sky Events download logic
    function downloadSkyEvents(card) {
        const link = card.querySelector('a[data-action="download-sky-events"]');
        if (!link) {
            alert('Error: Sky Events download link not found.');
            console.error('Missing Sky Events link');
            return;
        }

        if (link.getAttribute('href') === '#') {
            alert('Sky Events PDF is not available. Please upload a valid PDF file.');
        }
        // Download is triggered by the <a> tag's href and download attribute
    }

    // Tools Section: Flip card and action handling
    function setupTools() {
        const toolCards = document.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            const activateBtn = card.querySelector('.tool-activate-btn');
            const closeBtn = card.querySelector('.tool-close-btn');
            const actionBtn = card.querySelector('.tool-action-btn');

            // Flip to back
            if (activateBtn) {
                activateBtn.addEventListener('click', () => {
                    card.classList.add('flipped');
                    const firstInput = card.querySelector('.tool-back input, .tool-back button, .tool-back a');
                    if (firstInput) firstInput.focus();
                });
            }

            // Flip to front
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    card.classList.remove('flipped');
                    activateBtn.focus();
                });
            }

            // Keyboard support for flipping
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (document.activeElement === activateBtn) {
                        card.classList.add('flipped');
                        const firstInput = card.querySelector('.tool-back input, .tool-back button, .tool-back a');
                        if (firstInput) firstInput.focus();
                    } else if (document.activeElement === closeBtn) {
                        card.classList.remove('flipped');
                        activateBtn.focus();
                    }
                }
            });

            // Tool-specific actions
            if (actionBtn) {
                actionBtn.addEventListener('click', () => {
                    const action = actionBtn.getAttribute('data-action');
                    const dataTool = card.getAttribute('data-tool');

                    if (!card.classList.contains('flipped')) {
                        alert('Please open the tool first.');
                        return;
                    }

                    switch (action) {
                        case 'calculate-moon-phase':
                            if (dataTool === 'moon-phase') {
                                calculateMoonPhase(card);
                            }
                            break;
                        case 'fetch-nasa-apod':
                            if (dataTool === 'nasa-apod') {
                                fetchNasaAPOD(card);
                            }
                            break;
                        case 'download-sky-events':
                            if (dataTool === 'sky-events') {
                                downloadSkyEvents(card);
                            }
                            break;
                        default:
                            console.warn('Unknown action:', action);
                    }
                });
            }
        });
    }

    // Window resize handler
    function setupResizeHandler() {
        window.addEventListener('resize', () => {
            const planetContainer = document.querySelector('.planet-container');
            if (planetContainer) {
                planetContainer.style.margin = '0 auto';
            }
        });
    }

    // Initialize all functionality
    function initialize() {
        setupSmoothScroll();
        setupPlanetAnimation();
        setupNewsletterForm();
        setupJoinForm();
        setupExploreButton();
        setupViewAllButton();
        setupPartnerLogos();
        setupTools();
        setupResizeHandler();
    }

    // Run initialization
    initialize();
});