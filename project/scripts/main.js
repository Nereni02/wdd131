function initNavToggle() {
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    const nav = document.getElementById('site-nav');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (nav) nav.classList.toggle('open');
    });
  });
}

function setFooterYears() {
  const years = document.querySelectorAll('[id^="year"]');
  const y = new Date().getFullYear();
  years.forEach(el => el.textContent = y);
}

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const msg = document.getElementById('newsletter-msg');
  if (!form || !input || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) {
      msg.textContent = 'Please enter a valid email address.';
      return;
    }
    const key = 'vv_newsletters';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    // avoid duplicates
    if (existing.includes(email)) {
      msg.textContent = 'You are already subscribed with this email.';
      return;
    }
    existing.push(email);
    localStorage.setItem(key, JSON.stringify(existing));
    msg.textContent = 'Thank you for subscribing.';
    input.value = '';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  setFooterYears();
  initNewsletter();
});
