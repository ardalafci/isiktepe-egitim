/* ============================================================
   IŞIKTEPE EĞİTİM GÖNÜLLÜLERİ DERNEĞİ — Main JavaScript
   ============================================================ */

(function () {
    'use strict';

    // ============================================================
    // CONFIGURATION — Easily editable data
    // ============================================================

    /**
     * External form URLs — replace placeholders with real URLs when ready
     * These are referenced throughout the page for CTA buttons
     */
    const CONFIG = {
        forms: {
            volunteer: '#gonullu',       // [PLACEHOLDER: Gönüllü başvuru form URL]
            mentor: '#gonullu',          // [PLACEHOLDER: Mentor başvuru form URL]
            alumniNetwork: '#gonullu',   // [PLACEHOLDER: Mezun ağı katılım form URL]
        }
    };

    /**
     * Events data — update this array with real events
     * Each event: { day, month, year, title, description, status: 'upcoming' | 'past' }
     */
    const EVENTS_DATA = [
        // EVENTS_DATA içinde ilgili etkinliği güncelle
        {
            day: '02',
            month: '08',
            year: 2026,
            title: '1. Olağan Genel Kurul İlanı',
            description: `Işıktepe Eğitim Gönüllüleri Derneği Yönetim Kurulu tarafından 1. Olağan Genel Kurul Toplantısı’na tüm üyelerimiz davetlidir.
            
            1. Toplantı Tarihi: 02/08/2026, Saat: 12:00
            Yer: Dernek Binası`,
            pdfLink: 'assets/pdf/1.pdf', // PDF'in yolu
            status: 'upcoming'
        },
        {
            day: '—',
            month: '—',
            year: 2026,
            title: 'Kuruluş Buluşması',
            description: 'Derneğimizin kuruluş sürecini ve vizyonumuzu paylaştığımız ilk topluluk buluşması.',
            status: 'past'
        }
    ];

    // ============================================================
    // DOM Elements
    // ============================================================
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.header__nav-link');
    const floatingCTA = document.getElementById('floating-cta');
    const heroCanvas = document.getElementById('hero-particles');
    const eventsContainer = document.getElementById('events-container');

    // ============================================================
    // HEADER — Sticky shrink on scroll
    // ============================================================
    let lastScrollY = 0;

    function handleHeaderScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ============================================================
    // MOBILE NAVIGATION
    // ============================================================

    // Create overlay element for mobile nav
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    function toggleMobileNav() {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        navOverlay.classList.toggle('visible');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMobileNav() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        navOverlay.classList.remove('visible');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMobileNav);
    navOverlay.addEventListener('click', closeMobileNav);

    // Close mobile nav when a link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navMenu.classList.contains('open')) {
                closeMobileNav();
            }
        });
    });

    // Close mobile nav on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMobileNav();
        }
    });

    // ============================================================
    // ACTIVE SECTION HIGHLIGHTING
    // ============================================================
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection, { passive: true });

    // ============================================================
    // FLOATING CTA — Show after scrolling past hero, hide in #gonullu
    // ============================================================
    function handleFloatingCTA() {
        const heroSection = document.getElementById('hero');
        const gonulluSection = document.getElementById('gonullu');

        if (!heroSection || !floatingCTA) return;

        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollY = window.scrollY;

        // Show after scrolling past hero
        if (scrollY > heroBottom - 200) {
            floatingCTA.classList.add('visible');
        } else {
            floatingCTA.classList.remove('visible');
        }

        // Hide when in the Gönüllü Ol section
        if (gonulluSection) {
            const gonulluTop = gonulluSection.offsetTop - 100;
            const gonulluBottom = gonulluTop + gonulluSection.offsetHeight + 100;

            if (scrollY >= gonulluTop && scrollY <= gonulluBottom) {
                floatingCTA.classList.add('hidden-in-section');
            } else {
                floatingCTA.classList.remove('hidden-in-section');
            }
        }
    }

    window.addEventListener('scroll', handleFloatingCTA, { passive: true });

    // ============================================================
    // HERO — Star Particle Animation (Canvas)
    // ============================================================
    function initStarParticles() {
        if (!heroCanvas) return;

        const ctx = heroCanvas.getContext('2d');
        let width, height;
        let particles = [];
        let animationId;

        // Particle count — fewer on mobile for performance
        const isMobile = window.innerWidth < 768;
        const PARTICLE_COUNT = isMobile ? 25 : 50;

        function resize() {
            width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
            height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
            };
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function drawStar(x, y, size, opacity) {
            ctx.save();
            ctx.translate(x, y);
            ctx.globalAlpha = opacity;

            // Draw a 4-pointed star
            ctx.fillStyle = '#F5C842';
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 2;
                const outerX = Math.cos(angle) * size;
                const outerY = Math.sin(angle) * size;
                const innerAngle = angle + Math.PI / 4;
                const innerX = Math.cos(innerAngle) * size * 0.35;
                const innerY = Math.sin(innerAngle) * size * 0.35;

                if (i === 0) {
                    ctx.moveTo(outerX, outerY);
                } else {
                    ctx.lineTo(outerX, outerY);
                }
                ctx.lineTo(innerX, innerY);
            }
            ctx.closePath();
            ctx.fill();

            // Add glow effect
            ctx.shadowBlur = size * 3;
            ctx.shadowColor = 'rgba(245, 200, 66, ' + opacity * 0.5 + ')';
            ctx.fill();

            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(function (p) {
                // Update position
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += p.pulseSpeed;

                // Wrap around edges
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

                // Pulsing opacity
                const dynamicOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

                drawStar(p.x, p.y, p.size, dynamicOpacity);
            });

            animationId = requestAnimationFrame(animate);
        }

        // Initialize
        resize();
        initParticles();
        animate();

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                resize();
                initParticles();
            }, 200);
        });

        // Pause animation when tab not visible
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    }

    // ============================================================
    // EVENTS — Render from data
    // ============================================================
function renderEvents() {
    if (!eventsContainer) return;

    const html = EVENTS_DATA.map(function (event, index) {
        // Linkli yapı: her kartı bir link içine aldık
        return (
            '<a href="etkinlik-detay.html?id=' + index + '" class="event-card-link">' +
            '<article class="event-card">' +
            '  <div class="event-card__body">' +
            '    <h3 class="event-card__title">' + event.title + '</h3>' +
            '    <p class="event-card__description">Detaylar için tıklayın...</p>' +
            '  </div>' +
            '</article>' +
            '</a>'
        );
    }).join('');

    eventsContainer.innerHTML = html;
}

    // ============================================================
    // SMOOTH SCROLL — For older browsers fallback
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetEl.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================================
    // SCROLL REVEAL — Subtle fade-in for sections
    // ============================================================
    function initScrollReveal() {
        if (!('IntersectionObserver' in window)) return;

        const revealElements = document.querySelectorAll('.section__header, .pillar-card, .mentor-card, .network-card, .volunteer-card, .event-card, .vision-block, .donation-block, .contact-item, .social-link');

        // Add initial hidden state
        revealElements.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Stagger animation for grid items
                    const parent = entry.target.parentElement;
                    const siblings = parent.querySelectorAll('.pillar-card, .mentor-card, .network-card, .volunteer-card');
                    let delay = 0;

                    if (siblings.length > 0) {
                        const index = Array.prototype.indexOf.call(siblings, entry.target);
                        if (index >= 0) {
                            delay = index * 100;
                        }
                    }

                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    function renderBlog() {
    const blogContainer = document.querySelector('.blog-grid');
    if (!blogContainer) return;

    const html = BLOG_DATA.map(post => `
        <article class="blog-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
            <h3 style="margin-bottom: 10px;">${post.title}</h3>
            <p style="color: #666; font-size: 0.9rem;">${post.summary}</p>
            <a href="${post.link}" style="color: var(--color-primary); display: inline-block; margin-top: 10px; font-weight: bold;">Devamını oku →</a>
        </article>
    `).join('');

    blogContainer.innerHTML = html;
}

    // ============================================================
    // INITIALIZATION
    // ============================================================
    function init() {
        handleHeaderScroll();
        handleFloatingCTA();
        highlightActiveSection();
        initStarParticles();
        renderEvents();
        initScrollReveal();
        renderBlog();
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }




})();



