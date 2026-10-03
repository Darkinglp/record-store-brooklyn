document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      
      // Animate hamburger lines
      const bars = navToggle.querySelectorAll('.bar');
      if (!isExpanded) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.transform = 'none';
      }
    });

    // Close menu when clicking on any anchor link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.transform = 'none';
      });
    });
  }

  // 2. Navbar Backdrop Blur on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Smooth Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  // 4. Modal promocional de evento dominical
 const promoModal = document.getElementById('promoModal');
const closePromoBtn = document.getElementById('closePromoModal');

if (promoModal && closePromoBtn) {
  setTimeout(() => {
    promoModal.classList.add('is-visible');
  }, 1000);

  closePromoBtn.addEventListener('click', () => {
    promoModal.classList.remove('is-visible');
  });

  promoModal.addEventListener('click', (e) => {
    if (e.target === promoModal) {
      promoModal.classList.remove('is-visible');
    }
  });
}

  revealElements.forEach(el => revealObserver.observe(el));
});