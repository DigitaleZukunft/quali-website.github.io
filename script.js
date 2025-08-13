document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;
  const navCtas = document.querySelector('.nav-cta');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      body.style.overflow = isOpen ? 'hidden' : '';
      if (navCtas) {
        navCtas.style.display = isOpen ? 'none' : '';
      }
    });

    // Close menu on link click and restore scroll
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
          body.style.overflow = '';
        }
      });
    });
  }

  document.querySelectorAll('[data-action="connect"]').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Wallet connect coming soon. This is a static demo.');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.feature, .usecase, .steps li, .callout, .glass-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    observer.observe(el);
  });

  // Respect prefers-reduced-motion for initial reveal states
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.feature, .usecase, .steps li, .callout, .glass-card').forEach(el => {
      el.style.transition = 'none';
      el.classList.add('reveal');
    });
  }
});

const style = document.createElement('style');
style.textContent = `
.reveal { opacity: 1 !important; transform: translateY(0) !important; transition: opacity .6s ease, transform .6s ease; }
`;
document.head.appendChild(style);


