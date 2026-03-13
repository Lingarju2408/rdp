// ==============================
//  RAW DIGITAL PHOTOGRAPHY
//  JavaScript – script.js
// ==============================

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2000);
});

document.body.style.overflow = 'hidden';

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.05) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .testi-card, .gallery-item, .step, .about-card, .contact-item, .feature, .refer-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ---- GALLERY FILTER ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ---- WHATSAPP CONTACT FORM ---- */
function sendWhatsApp() {
  const name = document.getElementById('waName').value.trim();
  const service = document.getElementById('waService').value;
  const date = document.getElementById('waDate').value;
  const msg = document.getElementById('waMsg').value.trim();

  if (!name) {
    alert('Please enter your name.');
    document.getElementById('waName').focus();
    return;
  }
  if (!service) {
    alert('Please select a service.');
    document.getElementById('waService').focus();
    return;
  }

  let message = `Hi Nithin! 👋 I found your website and would like to book a session.\n\n`;
  message += `*Name:* ${name}\n`;
  message += `*Service:* ${service}\n`;
  if (date) message += `*Preferred Date:* ${new Date(date).toDateString()}\n`;
  if (msg) message += `*Message:* ${msg}\n`;
  message += `\nLooking forward to hearing from you! 📸`;

  // ⚠️ REPLACE the number below with your actual WhatsApp number (country code + number, no spaces/dashes)
  const phoneNumber = '91XXXXXXXXXX'; // e.g. '919876543210'
  const encodedMsg = encodeURIComponent(message);
  const waURL = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

  window.open(waURL, '_blank');
}

/* ---- SMOOTH ACTIVE NAV LINK ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => activeObserver.observe(section));

/* ---- ADD FADEIN KEYFRAME ---- */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.nav-links a.active { color: var(--saffron) !important; }
.nav-links a.active::after { width: 100% !important; background: var(--saffron) !important; }
`;
document.head.appendChild(styleSheet);
