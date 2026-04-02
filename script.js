/* =============================================
   KOINZ CAPITAL — Batch 2025.2
   script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky Navbar shadow ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Mobile Menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── Counter Animation ──
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, step);
  }

  // ── Testimonial Carousel ──
  const cards = document.querySelectorAll('.testimonial-card');
  const dots  = document.querySelectorAll('.t-dot');
  let current = 0;
  let autoTimer;

  function goTo(index) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo((current + 1) % cards.length); }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      goTo(parseInt(dot.dataset.dot));
      autoTimer = setInterval(next, 5000);
    });
  });

  const testimonialsSection = document.querySelector('.testimonials-section');
  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!autoTimer) autoTimer = setInterval(next, 5000);
      } else {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    });
  }, { threshold: 0.3 });

  if (testimonialsSection) testimonialObserver.observe(testimonialsSection);

  const testimonialWrap = document.querySelector('.testimonial-wrap');
  if (testimonialWrap) {
    testimonialWrap.addEventListener('mouseenter', () => {
      clearInterval(autoTimer);
      autoTimer = null;
    });
    testimonialWrap.addEventListener('mouseleave', () => {
      if (!autoTimer) autoTimer = setInterval(next, 5000);
    });

    // Drag / swipe (mouse)
    let dragStartX = null;
    testimonialWrap.addEventListener('mousedown', (e) => {
      dragStartX = e.clientX;
    });
    testimonialWrap.addEventListener('mouseup', (e) => {
      if (dragStartX === null) return;
      const diff = e.clientX - dragStartX;
      dragStartX = null;
      if (Math.abs(diff) < 40) return;
      clearInterval(autoTimer);
      autoTimer = null;
      if (diff < 0) {
        goTo((current + 1) % cards.length);
      } else {
        goTo((current - 1 + cards.length) % cards.length);
      }
    });
    testimonialWrap.addEventListener('mouseleave', () => { dragStartX = null; });

    // Swipe (touch)
    let touchStartX = null;
    testimonialWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    testimonialWrap.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const diff = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(diff) < 40) return;
      clearInterval(autoTimer);
      autoTimer = null;
      if (diff < 0) {
        goTo((current + 1) % cards.length);
      } else {
        goTo((current - 1 + cards.length) % cards.length);
      }
    }, { passive: true });
  }


  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── FAQ Accordion ──
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

});