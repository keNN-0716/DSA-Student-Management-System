let mobileMenuToggle, mobileMenu, mobileNavLinks;

function initializeCommonFeatures() {
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    mobileMenu = document.getElementById('mobileMenu');
    mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent! ✓';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    submitBtn.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        submitBtn.style.transform = 'scale(1)';
                    }, 200);
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 3000);
                }, 2000);
            }
        });
    }

    document.querySelectorAll('.feature-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });

    let ticking = false;
    function updateParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.feature-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    const featuresSection = document.querySelector('.features-grid');
    if (featuresSection) {
        featuresObserver.observe(featuresSection);
    }
}

function initializeLoginPage() {
    console.log('Initializing login page...');
    
    // Role selection functionality
    const roleButtons = document.querySelectorAll('.role-btn');
    const loginTitle = document.getElementById('login-title');
    const loginSubtitle = document.getElementById('login-subtitle');
    const demoCredentials = document.getElementById('demoCredentials');

    const roleConfig = {
        student: {
            title: 'Student Login',
            subtitle: 'Access your courses, grades, and academic resources',
            credentials: 'Username: student123 | Password: student123'
        },
        teacher: {
            title: 'Teacher Login',
            subtitle: 'Manage your classes, students, and gradebook',
            credentials: 'Username: teacher123 | Password: teacher123'
        },
        admin: {
            title: 'Admin Login',
            subtitle: 'System administration and management',
            credentials: 'Username: admin123 | Password: admin123'
        }
    };

    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            roleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const role = this.getAttribute('data-role');
            updateLoginInterface(role);
        });
    });

    function updateLoginInterface(role) {
        const config = roleConfig[role];
        if (config) {
            loginTitle.textContent = config.title;
            loginSubtitle.textContent = config.subtitle;
            demoCredentials.innerHTML = `
                <div>Username: <strong>${role}123</strong></div>
                <div>Password: <strong>${role}123</strong></div>
            `;
        }
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const activeRole = document.querySelector('.role-btn.active').getAttribute('data-role');
            
            // Simple validation
            if (!username || !password) {
                alert('Please enter both username and password');
                return;
            }

            // Check credentials
            const expectedUsername = activeRole + '123';
            const expectedPassword = activeRole + '123';
            
            if (username === expectedUsername && password === expectedPassword) {
                // Success - show loading state
                const submitBtn = loginForm.querySelector('.login-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = 'Logging in...';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert(`Login successful! Welcome ${activeRole}`);
                    // Redirect to dashboard (you can change this)
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                alert('Invalid credentials. Please use the demo credentials shown below.');
            }
        });
    }

    console.log('Login page initialized successfully');
}

function initializeDashboard() {
    console.log('Initializing dashboard...');
    setupNavigation();
    setupSidebar();
    setupLogout();
    initializeDashboardAnimations();
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    
    if (navItems.length === 0 || sections.length === 0) return;
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            navItems.forEach(navItem => navItem.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            item.classList.add('active');

            const targetId = item.getAttribute('href')?.substring(1);
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
        });
    });
}

function setupSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const dashboardNav = document.querySelector('.dashboard-nav .nav-container');
    
    if (!sidebar || !dashboardNav) return;
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.style.display = 'none';
    
    dashboardNav.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    function handleResize() {
        if (window.innerWidth <= 1024) {
            toggleBtn.style.display = 'block';
            sidebar.classList.remove('active');
        } else {
            toggleBtn.style.display = 'none';
            sidebar.classList.add('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

function setupLogout() {
    const logoutBtns = document.querySelectorAll('.logout-btn');
    
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (confirm('Are you sure you want to logout?')) {
                document.body.style.opacity = '0.7';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            }
        });
    });
}

function initializeDashboardAnimations() {
    const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statCards = entry.target.querySelectorAll('.stat-card');
                const contentCards = entry.target.querySelectorAll('.content-card');
                
                statCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                contentCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, (statCards.length * 100) + (index * 150));
                });
            }
        });
    }, { threshold: 0.1 });

    const dashboardSections = document.querySelectorAll('.dashboard-section');
    if (dashboardSections.length > 0) {
        dashboardSections.forEach(section => {
            dashboardObserver.observe(section);

            section.querySelectorAll('.stat-card, .content-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease';
            });
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    initializeCommonFeatures();
    
    // Check if we're on login page
    if (document.querySelector('.login-body')) {
        console.log('Login page detected');
        initializeLoginPage();
    }
    
    // Check if we're on dashboard page
    if (document.querySelector('.dashboard-body')) {
        console.log('Dashboard page detected');
        initializeDashboard();
    }
    
    console.log('Initialization complete');
});

// Fallback initialization for login page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoginPage);
} else {
    initializeLoginPage();
}