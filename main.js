// ===== NAVBAR =====
(function() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll behavior - add shadow on scroll
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.style.top = '8px';
      } else {
        navbar.style.top = '16px';
      }
    }
  });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      // Animate hamburger
      const spans = hamburger.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // Update nav based on session
  const session = JSON.parse(localStorage.getItem('mitrc_session') || 'null');
  if (session) {
    const loginBtn = document.querySelector('.nav-login-btn');
    if (loginBtn) {
      loginBtn.textContent = 'Dashboard';
      loginBtn.href = 'dashboard.html';
    }
    const mobileLogin = document.querySelector('.mobile-login');
    if (mobileLogin) {
      mobileLogin.textContent = 'Dashboard';
      mobileLogin.href = 'dashboard.html';
    }
  }
})();

// ===== FAQ =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

// ===== SMOOTH SCROLL for hash links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== INTERSECTION OBSERVER for animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.category-card, .prize-card, .partner-logo-wrap, .faq-item, .timeline-item, .highlight-item, .dash-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== NAV LINK SMOOTH SCROLL FOR CROSS-PAGE =====
// Handle hash in URL on page load
if (window.location.hash) {
  setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if (target) {
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 300);
}
