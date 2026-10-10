/* =====================================================
   JAYA JAGANNATH DEGREE COLLEGE - MAIN SCRIPT
   ===================================================== */

// ---------- MOBILE MENU TOGGLE ----------
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', function () {
  navbar.classList.toggle('open');
  const icon = menuToggle.querySelector('i');
  if (navbar.classList.contains('open')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 820) {
      navbar.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// ---------- SMOOTH SCROLL & ACTIVE LINK ----------
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Back to top button visibility
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// ---------- BACK TO TOP ----------
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- SCROLL REVEAL ANIMATION ----------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ---------- INITIAL ACTIVE LINK (home) ----------
window.dispatchEvent(new Event('scroll'));
/* =====================================================
   ABOUT SECTION - AUTO SLIDING PHOTOS
   ===================================================== */

(function () {
  const slides = document.querySelectorAll('.about-slider .slide');
  const dots = document.querySelectorAll('.about-slider .dot');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let slideInterval;
  const SLIDE_DURATION = 3000; // 3 second - change kar sakti hain

  // Function: Show specific slide
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    if (dots[index]) {
      dots[index].classList.add('active');
    }

    currentIndex = index;
  }

  // Function: Next slide
  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  // Start auto-slide
  function startSlider() {
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  // Stop auto-slide
  function stopSlider() {
    clearInterval(slideInterval);
  }

  // Dot click - manual navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopSlider();
      showSlide(index);
      startSlider();
    });
  });

  // Pause on hover (desktop)
  const sliderContainer = document.querySelector('.about-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);

    // Touch pause (mobile)
    sliderContainer.addEventListener('touchstart', stopSlider);
    sliderContainer.addEventListener('touchend', startSlider);
  }

  // Start slider
  startSlider();

  // Restart when page becomes visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlider();
    } else {
      startSlider();
    }
  });
})();
