// Smooth scrolling cho navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll cho các navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero buttons smooth scroll
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        if (button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Animate skill bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level + '%';
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#ef4444';
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.btn-primary');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Đang gửi...';
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Cảm ơn bạn đã gửi tin nhắn! Mình sẽ phản hồi sớm nhất có thể.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại email.');
            }
        });
    }

    // Add animation classes for elements when they come into view
    const animateOnScrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add initial styles and observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        animateOnScrollObserver.observe(element);
    });

    // Mobile menu toggle (nếu cần thiết cho responsive)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-menu');
        
        // Tạo hamburger button cho mobile
        const mobileToggle = document.createElement('button');
        mobileToggle.classList.add('mobile-toggle');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.style.display = 'none';
        mobileToggle.style.background = 'none';
        mobileToggle.style.border = 'none';
        mobileToggle.style.fontSize = '1.5rem';
        mobileToggle.style.color = '#2563eb';
        mobileToggle.style.cursor = 'pointer';
        
        nav.appendChild(mobileToggle);
        
        // Toggle menu on mobile
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
        
        // Hide menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
        
        // Show/hide mobile toggle based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                mobileToggle.style.display = 'block';
                navMenu.style.display = navMenu.classList.contains('show') ? 'flex' : 'none';
            } else {
                mobileToggle.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.classList.remove('show');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    createMobileMenu();

    // Add dynamic typing effect to hero title
    const typeEffect = () => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = '';
            let i = 0;
            
            const typeTimer = setInterval(() => {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeTimer);
                }
            }, 100);
        }
    };
    
    // Delay typing effect slightly
    setTimeout(typeEffect, 500);

    // Add cursor pointer for interactive elements
    const interactiveElements = document.querySelectorAll('.skill-card, .project-card, .btn');
    interactiveElements.forEach(element => {
        element.style.cursor = 'pointer';
    });

    console.log('🚀 Portfolio website của An đã sẵn sàng!');
    console.log('💡 Được tạo bởi học sinh MindX Technology School');
});