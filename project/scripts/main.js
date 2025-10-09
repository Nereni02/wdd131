/* main.js - funciones comunes: nav toggle, footer year, newsletter handling */

/* Toggle navigation for mobile (DOM interaction; events) */
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

/* Colocar año en footer */
function setFooterYears() {
  const years = document.querySelectorAll('[id^="year"]');
  const y = new Date().getFullYear();
  years.forEach(el => el.textContent = y);
}

/* Newsletter form (simple localStorage subscription) */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const msg = document.getElementById('newsletter-msg');
  if (!form || !input || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) {
      msg.textContent = 'Por favor ingresa un correo válido.';
      return;
    }
    // Save to localStorage using an array of subscriptions
    const key = 'vv_newsletters';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    // avoid duplicates
    if (existing.includes(email)) {
      msg.textContent = 'Ya estás suscrito con este correo.';
      return;
    }
    existing.push(email);
    localStorage.setItem(key, JSON.stringify(existing));
    msg.textContent = 'Gracias por suscribirte.';
    input.value = '';
  });
}

/* Inicialización general */
document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  setFooterYears();
  initNewsletter();
});
