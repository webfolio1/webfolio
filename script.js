// ==================== SCROLL ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ==================== MOBILE MENU TOGGLE ====================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ==================== SMOOTH SCROLLING ====================
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== BACK TO TOP BUTTON ====================
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==================== PORTFOLIO VIDEO HOVER PLAY ====================
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const video = item.querySelector('video');
        
        if (video) {
            item.addEventListener('mouseenter', function() {
                video.play();
            });
            
            item.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // ==================== HERO STATS COUNTER ANIMATION ====================
    function animateCounter(element, target, duration) {
        let current = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            }
        }, 16);
    }

    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                entry.target.textContent = '0' + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
                animateCounter(entry.target, number, 2000);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ==================== PRICING CARD HOVER EFFECT ====================
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });

    // ==================== TESTIMONIALS SLIDER (Auto rotate) ====================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            if (index === currentTestimonial) {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            } else {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });

        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }

    // Rotate testimonials every 5 seconds
    if (testimonialCards.length > 0) {
        setInterval(rotateTestimonials, 5000);
    }

    // ==================== PARALLAX EFFECT FOR HERO SECTION ====================
    const heroSection = document.querySelector('.hero');
    const heroMedia = document.querySelector('.hero-media');

    window.addEventListener('scroll', function() {
        if (heroSection && window.innerWidth > 768) {
            const scrollPosition = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrollPosition < heroHeight) {
                if (heroMedia) {
                    heroMedia.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                }
            }
        }
    });

    // ==================== FORM VALIDATION (if forms are added later) ====================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#10b981';
                }
            });
            
            if (isValid) {
                // Submit form or show success message
                alert('شكراً لتواصلك معنا! سنرد عليك قريباً');
                form.reset();
            } else {
                alert('يرجى ملء جميع الحقول المطلوبة');
            }
        });
    });

    // ==================== ADD LOADING ANIMATION ====================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ==================== LAZY LOADING FOR VIDEOS ====================
    const videos = document.querySelectorAll('video[data-src]');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.load();
                videoObserver.unobserve(video);
            }
        });
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });

    // ==================== MOUSE CURSOR EFFECT (Optional) ====================
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // ==================== SERVICE CARDS STAGGER ANIMATION ====================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // ==================== PORTFOLIO FILTER (if categories are added) ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItemsAll = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItemsAll.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==================== SCROLL PROGRESS INDICATOR ====================
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.2s ease;
        }
        
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid #667eea;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            transform: translate(-50%, -50%);
        }
    `;
    document.head.appendChild(style);

    // ==================== CONSOLE MESSAGE ====================
    console.log('%c Webfolio Landing Page ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px;');
    console.log('%c Designed with ❤️ by Webfolio Team ', 'background: #f7fafc; color: #2d3748; font-size: 14px; padding: 5px;');
});

// ==================== PAGE VISIBILITY API (Pause videos when tab is hidden) ====================
document.addEventListener('visibilitychange', function() {
    const videos = document.querySelectorAll('video');
    
    if (document.hidden) {
        videos.forEach(video => {
            if (!video.paused) {
                video.dataset.wasPlaying = 'true';
                video.pause();
            }
        });
    } else {
        videos.forEach(video => {
            if (video.dataset.wasPlaying === 'true') {
                video.play();
                delete video.dataset.wasPlaying;
            }
        });
    }
});