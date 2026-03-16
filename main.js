'use strict';

(function () {

  /* Header: transparent → frosted glass on scroll */
  const header = document.getElementById('site-header');

  if (header) {
    const SOLID = 80;
    let ticking  = false;

    function updateHeader() {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > SOLID);
      header.classList.toggle('on-hero',  y <= SOLID);
      ticking = false;
    }

    updateHeader();
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
    }, { passive: true });
  }


  /* Mobile nav toggle */
  const toggle    = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  function openNav() {
    if (!toggle || !mobileNav) return;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    const [a, b, c] = toggle.querySelectorAll('span');
    a.style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
    b.style.opacity   = '0';
    c.style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
    mobileNav.querySelectorAll('a').forEach(el => el.removeAttribute('tabindex'));
  }

  function closeNav() {
    if (!toggle || !mobileNav) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    const [a, b, c] = toggle.querySelectorAll('span');
    a.style.transform = b.style.opacity = c.style.transform = '';
    mobileNav.querySelectorAll('a').forEach(el => el.setAttribute('tabindex', '-1'));
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      mobileNav.classList.contains('open') ? closeNav() : openNav();
    });
    document.addEventListener('click', e => {
      if (mobileNav.classList.contains('open') &&
          !toggle.contains(e.target) && !mobileNav.contains(e.target)) closeNav();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeNav(); toggle.focus();
      }
    });
  }


  /* Smooth scroll + URL hash */
  function getHeaderH() {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '64', 10
    );
  }

  function scrollTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getHeaderH() - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      scrollTo(href);
      closeNav();
      if (history.pushState) history.pushState(null, '', href);
    });
  });

  if (location.hash) setTimeout(() => scrollTo(location.hash), 300);


  /* Active nav link tracking */
  const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a =>
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
          );
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
  }


  /* FAQ accordion */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.faq-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* Lazy image fade-in */
  function initLazyImage(img) {
    // Determine if this image should have fade-in
    const isLazy = img.loading === 'lazy' || img.classList.contains('lazy-img');
    if (!isLazy) return;

    // Ensure the CSS class is present for the transition
    img.classList.add('lazy-img');

    function markDone() { img.classList.add('loaded'); }
    if (img.complete && img.naturalWidth > 0) {
      markDone();
    } else {
      img.addEventListener('load',  markDone, { once: true });
      img.addEventListener('error', markDone, { once: true });
    }
  }

  document.querySelectorAll('img').forEach(initLazyImage);


  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

})();
