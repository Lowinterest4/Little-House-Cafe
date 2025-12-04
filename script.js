// ----------------------------------------
// MOBILE NAV
// ----------------------------------------
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// ----------------------------------------
// ACTIVE MENU LINKS
// ----------------------------------------
document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.site-nav a')
      .forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    nav.classList.remove('open');
  });
});

// ----------------------------------------
// CAROUSEL FUNCTIONALITY
// ----------------------------------------
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');

let index = 0;

// Create dots
items.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function updateCarousel() {
  const itemWidth = items[0].getBoundingClientRect().width + 16;
  track.style.transform = `translateX(-${index * itemWidth}px)`;

  [...dotsContainer.children].forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function goTo(i) {
  index = Math.max(0, Math.min(items.length - 1, i));
  updateCarousel();
}

prevBtn.addEventListener('click', () => goTo(index - 1));
nextBtn.addEventListener('click', () => goTo(index + 1));

window.addEventListener('resize', updateCarousel);
updateCarousel();

// Auto-slide every 5 seconds
setInterval(() => {
  index = (index + 1) % items.length;
  updateCarousel();
}, 5000);


// ----------------------------------------
// LOGIN FORM VALIDATION
// ----------------------------------------
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail');
    const pass = document.getElementById('loginPassword');

    let valid = true;

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError(email, "Enter a valid email.");
      valid = false;
    } else showError(email, "");

    // Password
    if (pass.value.length < 8) {
      showError(pass, "Password must be at least 8 characters.");
      valid = false;
    } else showError(pass, "");

    if (valid) {
      alert("Login successful! Welcome back.");
      loginForm.reset();
    }
  });
}

// ----------------------------------------
// CONTACT FORM VALIDATION
// ----------------------------------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = ["name", "email", "message"];
    let ok = true;

    fields.forEach(id => {
      const el = document.getElementById(id);
      let msg = "";

      if (!el.value.trim()) {
        msg = "This field is required.";
        ok = false;
      }

      if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) {
        msg = "Enter a valid email.";
        ok = false;
      }

      showError(el, msg);
    });

    if (ok) {
      alert("Thank you! We'll get back to you soon.");
      contactForm.reset();
    }
  });
}

// ----------------------------------------
// ERROR HELPERS
// ----------------------------------------
function showError(input, message) {
  const small = input.parentElement.querySelector('.error');
  small.textContent = message;
}


