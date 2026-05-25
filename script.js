/**
 * AUREVON APPARELS - PREMIUM INTERACTIVE ENGINE
 * Custom mouse cursor glow, viewport reveal animations, and glassmorphic contact form modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       0. PRELOADER & INITIAL ENTRANCE ANIMATION
       ========================================================================== */
    const preloader = document.getElementById('page-preloader');
    let preloaded = false;

    function exitPreloader() {
        if (preloaded) return;
        preloaded = true;
        preloader.classList.add('fade-out');
        document.body.classList.add('loaded');
        
        // Trigger staggered fade-in entrance for the hero brand element and description
        setTimeout(() => {
            const heroReveals = document.querySelectorAll('#hero .reveal-fade');
            heroReveals.forEach(el => el.classList.add('active'));
        }, 300);
    }

    // Exit preloader when full assets load or after a controlled fallback timeout
    window.addEventListener('load', () => {
        setTimeout(exitPreloader, 2500); // Allow full collapsing wide-to-shrink atomic animation to settle
    });

    // Fallback safety timeout (4s maximum preloader time)
    setTimeout(exitPreloader, 4000);

    /* ==========================================================================
       1. INTERACTIVE CURSOR SPOTLIGHT GLOW
       ========================================================================== */
    const interactiveGlow = document.getElementById('interactive-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 3;
    let currentX = mouseX;
    let currentY = mouseY;

    // Track mouse coordinates with requestAnimationFrame for hardware-accelerated performance
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateSpotlight() {
        // Interpolate position for beautiful lag/inertia feel
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        
        interactiveGlow.style.setProperty('--mouse-x', `${currentX}px`);
        interactiveGlow.style.setProperty('--mouse-y', `${currentY}px`);
        
        requestAnimationFrame(updateSpotlight);
    }
    
    // Start spotlight loop
    requestAnimationFrame(updateSpotlight);

    /* ==========================================================================
       2. SCROLL REVEAL VIEWPORT OBSERVER
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-fade');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class and unobserve to trigger it once
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // Viewport
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Offset slightly for better scroll feeling
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       3. GLASSMORPHIC CONTACT MODAL ENGINE
       ========================================================================== */
    const openModalBtn = document.getElementById('open-modal-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeSuccessBtn = document.getElementById('close-success-btn');
    const contactForm = document.getElementById('contact-form');
    
    const modalFormState = document.getElementById('modal-form-state');
    const modalSuccessState = document.getElementById('modal-success-state');

    // Open Modal
    function openModal() {
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent body scroll behind modal
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('form-name').focus();
        }, 150);
    }

    // Close Modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore body scroll
        
        // Reset form and states after transition ends
        setTimeout(() => {
            contactForm.reset();
            modalFormState.style.display = 'block';
            modalSuccessState.style.display = 'none';
            // Enable submit button again
            const submitBtn = document.getElementById('submit-form-btn');
            submitBtn.disabled = false;
            submitBtn.querySelector('span').innerText = 'SEND MESSAGE';
        }, 400);
    }

    // Event Listeners for Open/Close
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', closeModal);
    }

    // Close modal by clicking the background overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal by pressing Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==========================================================================
       4. INTERACTIVE FORM SUBMISSION (MOCK SERVICE CALL)
       ========================================================================== */
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-form-btn');
        const submitSpan = submitBtn.querySelector('span');
        
        // Disable submission during execution
        submitBtn.disabled = true;
        submitSpan.innerText = 'SENDING...';
        
        // Mock premium server response latency
        setTimeout(() => {
            // Animate transition between form and success screen
            modalFormState.style.transition = 'opacity 0.3s ease';
            modalFormState.style.opacity = '0';
            
            setTimeout(() => {
                modalFormState.style.display = 'none';
                modalFormState.style.opacity = '1';
                
                modalSuccessState.style.display = 'flex';
                modalSuccessState.style.opacity = '0';
                
                // Trigger reflow for CSS drawing animation
                void modalSuccessState.offsetWidth;
                
                modalSuccessState.style.transition = 'opacity 0.3s ease';
                modalSuccessState.style.opacity = '1';
            }, 300);
            
        }, 1200);
    });
    
    /* ==========================================================================
       5. 3D CARD PARALLAX HOVER (EXTRA MICRO-INTERACTION)
       ========================================================================== */
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within element
            const y = e.clientY - rect.top;  // y coordinate within element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angles based on position relative to center
            const tiltX = (centerY - y) / 10;
            const tiltY = (x - centerX) / 12;
            
            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Return to rest cleanly
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

});
