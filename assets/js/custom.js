$(document).ready(function() {
    'use strict';
    
    // Modern loader with enhanced timing
    function initLoader() {
        const loader = $('.loader');
        
        $(window).on('load', function() {
            setTimeout(() => {
                loader.fadeOut(600, function() {
                    $(this).remove();
                });
            }, 800);
        });
    }
    
    // Enhanced hamburger menu with modern animations
    function initMobileMenu() {
        const hamburger = $('#hamburger, .hamburger');
        const navMenu = $('.cv_header_menu');
        const body = $('body');
        
        hamburger.on('click', function(e) {
            e.preventDefault();
            body.toggleClass('menu-open');
            
            // Add stagger animation to menu items
            if (body.hasClass('menu-open')) {
                $('.cv_menus li').each(function(index) {
                    $(this).css({
                        'animation-delay': (index * 0.1) + 's',
                        'animation': 'slideInLeft 0.6s ease forwards'
                    });
                });
            }
        });
        
        // Close menu when clicking on links
        $('.cv_menus a').on('click', function() {
            body.removeClass('menu-open');
        });
        
        // Close menu when clicking outside
        navMenu.on('click', function(e) {
            if (e.target === this) {
                body.removeClass('menu-open');
            }
        });
    }
    
    // Modern scroll to top with enhanced UX
    function initScrollToTop() {
        const scrollBtn = $('#button');
        
        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop > 300) {
                scrollBtn.addClass('show');
            } else {
                scrollBtn.removeClass('show');
            }
        });
        
        scrollBtn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800, 'easeInOutCubic');
        });
    }
    
    // Enhanced smooth scrolling for navigation
    function initSmoothScroll() {
        $('a[href*="#"]:not([href="#"])').on('click', function(e) {
            const target = $(this.hash);
            
            if (target.length) {
                e.preventDefault();
                
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'easeInOutCubic');
                
                // Close mobile menu if open
                $('body').removeClass('menu-open');
            }
        });
    }
    
    // Modern intersection observer for scroll animations
    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animatedElements = document.querySelectorAll(
                '.cv_about_box, .cv_edu_box, .cv_skill_box, .cv_do_box, .cv_address_box, .portfolio-item'
            );
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            animatedElements.forEach(el => {
                el.classList.add('animate-element');
                observer.observe(el);
            });
        }
    }
    
    // Enhanced skill bar animations
    function initSkillBars() {
  const $bars = $('.progress-bar');

  const getTarget = ($bar) => {
    const style = $bar.attr('style') || '';
    let m = style.match(/width:\s*(\d+)%/i);
    if (m) return m[1] + '%';
    const aria = $bar.attr('aria-valuenow');
    if (aria) return aria + '%';
    const txt = $bar.closest('.cv_skill_box').find('.cv_skill_text p').text() || '';
    m = txt.match(/(\d+)%/);
    if (m) return m[1] + '%';
    return '0%';
  };

  if (!('IntersectionObserver' in window)) {
    $bars.each(function(){ $(this).css('width', getTarget($(this))); });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const $bar = $(entry.target);
        const target = getTarget($bar);
        $bar.css('width', '0%');
        setTimeout(() => {
          $bar.animate({ width: target }, 1200, 'swing');
        }, 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  $bars.each(function(){ observer.observe(this); });
}

    
    // Modern parallax effects
    function initParallax() {
        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop();
            
            // Parallax for decorative elements
            $('.bnr-star').css({
                'transform': `translateY(${scrollTop * 0.3}px)`
            });
            
            // Subtle parallax for background elements
            $('.cv_banner_wrapper::before, .cv_about_wrapper::before').css({
                'transform': `translateY(${scrollTop * 0.1}px)`
            });
        });
    }
    
    // Enhanced hover effects for cards
    function initCardEffects() {
        $('.cv_edu_box, .cv_skill_box, .cv_do_box, .cv_address_box').each(function() {
            const $card = $(this);
            
            $card.on('mouseenter', function() {
                $(this).addClass('card-hover');
            }).on('mouseleave', function() {
                $(this).removeClass('card-hover');
            });
        });
        
        // Portfolio item enhanced effects
        $('.portfolio-item').each(function() {
            const $item = $(this);
            
            $item.on('mouseenter', function() {
                $item.find('img').css('transform', 'scale(1.1)');
                $item.find('.overlay').css('opacity', '1');
                $item.find('.text').css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }).on('mouseleave', function() {
                $item.find('img').css('transform', 'scale(1)');
                $item.find('.overlay').css('opacity', '0');
                $item.find('.text').css({
                    'opacity': '0',
                    'transform': 'translateY(20px)'
                });
            });
        });
    }
    
    // Enhanced navigation active state
    function initActiveNavigation() {
        const sections = $('section[id]');
        const navLinks = $('.cv_menus a');
        
        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop() + 100;
            
            sections.each(function() {
                const section = $(this);
                const sectionTop = section.offset().top;
                const sectionBottom = sectionTop + section.outerHeight();
                const sectionId = section.attr('id');
                
                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    navLinks.removeClass('active');
                    navLinks.filter(`[href*="${sectionId}"]`).addClass('active');
                }
            });
        });
    }
    
    // Modern form enhancements
    function initFormEnhancements() {
        // Add floating labels effect
        $('input, textarea').each(function() {
            const $input = $(this);
            const $parent = $input.parent();
            
            $input.on('focus blur', function() {
                $parent.toggleClass('focused', $input.is(':focus') || $input.val().length > 0);
            });
        });
        
        // Form validation with modern feedback
        $('form').on('submit', function(e) {
            e.preventDefault();
            
            const $form = $(this);
            const $inputs = $form.find('input[required], textarea[required]');
            let isValid = true;
            
            $inputs.each(function() {
                const $input = $(this);
                if (!$input.val().trim()) {
                    $input.addClass('error');
                    isValid = false;
                } else {
                    $input.removeClass('error');
                }
            });
            
            if (isValid) {
                // Add success feedback
                $form.addClass('success');
                setTimeout(() => {
                    alert('Message sent successfully!');
                    $form.removeClass('success');
                    $form[0].reset();
                }, 1000);
            }
        });
    }
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Enhanced resize handler
    function initResizeHandler() {
        const debouncedResize = debounce(function() {
            // Recalculate layouts on resize
            $('.cv_about_content, .cv_edu_info, .portfolio-container').each(function() {
                $(this).css('height', 'auto');
            });
        }, 250);
        
        $(window).on('resize', debouncedResize);
    }
    
    // Initialize all modern features
    function init() {
        initLoader();
        initMobileMenu();
        initScrollToTop();
        initSmoothScroll();
        initScrollAnimations();
        initSkillBars();
        initParallax();
        initCardEffects();
        initTypingEffect();
        initActiveNavigation();
        initFormEnhancements();
        initResizeHandler();
        
        // Add CSS classes for enhanced styling
        $('body').addClass('js-enabled');
        
        // Initialize AOS (Animate On Scroll) if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }
    }
    
    // Start initialization
    init();
    
    // Add modern easing functions
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
    
    $.easing.easeOutCubic = function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    };
});

// Modern CSS animations styles (inject into head)
const modernAnimationStyles = `
<style>
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-element {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-element.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.card-hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3) !important;
}

.form-group {
    position: relative;
    margin-bottom: 1.5rem;
}

.form-group.focused input,
.form-group.focused textarea {
    border-color: var(--cv-primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

input.error,
textarea.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.success {
    animation: successPulse 0.6s ease;
}

@keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

/* Modern loading skeleton */
.skeleton {
    background: linear-gradient(90deg, 
        var(--cv-bg-card) 25%, 
        rgba(148, 163, 184, 0.1) 50%, 
        var(--cv-bg-card) 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Enhanced focus styles for accessibility */
.cv_btn:focus,
.portfolio-item:focus,
.cv_menus a:focus {
    outline: 2px solid var(--cv-primary-color);
    outline-offset: 3px;
    border-radius: 4px;
}

/* Modern glassmorphism effects */
.glass-intense {
    background: rgba(30, 41, 59, 0.4);
    backdrop-filter: blur(25px) saturate(1.5);
    border: 1px solid rgba(148, 163, 184, 0.2);
}

/* Performance optimizations */
.will-change-transform {
    will-change: transform;
}

.will-change-opacity {
    will-change: opacity;
}

/* Modern button states */
.btn-loading {
    position: relative;
    color: transparent !important;
}

.btn-loading::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: button-spin 1s linear infinite;
}

@keyframes button-spin {
    to { transform: rotate(360deg); }
}
</style>
`;

// Inject modern styles
document.head.insertAdjacentHTML('beforeend', modernAnimationStyles);