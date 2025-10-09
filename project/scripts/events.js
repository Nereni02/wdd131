/* events.js - gestiona eventos, renderizado dinámico y RSVP usando localStorage
   Requisitos cumplidos aquí:
   - múltiples funciones
   - arrays/objetos y métodos (.filter, .map)
   - condicionales
   - template literals para output
   - eventos DOM y almacenamiento local
*/

const EVENTS_KEY = 'vv_events_rsvps';

/* Datos: array de objetos de eventos (ejemplo) */
const events = [
  {
    id: 'evt1',
    title: 'Taller de compostaje',
    date: '2025-10-24',
    time: '10:00',
    location: 'Plaza central',
    description: 'Aprende cómo transformar desechos en compost para tus macetas.',
    img: 'images/event-compost.jpg'
  },
  {
    id: 'evt2',
    title: 'Siembra de otoño',
    date: '2025-11-02',
    time: '09:00',
    location: 'Parcela 3',
    description: 'Plantaremos hortalizas de otoño y compartiremos semillas.',
    img: 'images/event-planting.jpg'
  },
  {
    id: 'evt3',
    title: 'Jornada de voluntariado',
    date: '2025-09-20',
    time: '08:00',
    location: 'Todo el jardín',
    description: 'Limpieza y mantenimiento general del jardín comunitario.',
    img: 'images/event-volunteer.jpg'
  }
];

/* Devuelve los RSVPs almacenados */
function loadRsvps() {
  return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
}

/* Guarda un RSVP (objeto con eventId y email) */
function saveRsvp(rsvp) {
  const list = loadRsvps();
  // evitar duplicados por email+eventId
  const exists = list.some(r => r.eventId === rsvp.eventId && r.email === rsvp.email);
  if (exists) return false;
  list.push(rsvp);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(list));
  return true;
}

/* Determina si un evento es futuro (comparación por fecha) */
function isFuture(eventDate) {
  const today = new Date();
  const d = new Date(eventDate);
  // compara solo por fecha (sin hora)
  d.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  return d >= today;
}

/* Renderiza lista de eventos (solo futuros por defecto) */
function renderEvents(showPast = false) {
  const container = document.getElementById('event-list');
  if (!container) return;
  const list = events.filter(ev => showPast ? true : isFuture(ev.date));
  if (list.length === 0) {
    container.innerHTML = `<p class="muted">No hay eventos disponibles.</p>`;
    return;
  }
  container.innerHTML = list.map(ev => {
    // template literal exclusivo
    return `
      <article class="event" aria-labelledby="title-${ev.id}">
        <img src="${ev.img}" alt="${ev.title}" loading="lazy" width="320" height="200">
        <div>
          <h3 id="title-${ev.id}">${ev.title}</h3>
          <p class="muted">${ev.date} • ${ev.time} — ${ev.location}</p>
          <p>${ev.description}</p>
          <form class="rsvp-form" data-event="${ev.id}">
            <label for="email-${ev.id}" class="sr-only">Correo para RSVP</label>
            <input id="email-${ev.id}" type="email" name="email" placeholder="tu@correo.com" required>
            <button class="btn primary" type="submit">RSVP</button>
            <span class="rsvp-msg muted" aria-live="polite"></span>
          </form>
        </div>
      </article>
    `;
  }).join('');
  attachRsvpHandlers();
}

/* Adjunta manejadores a los formularios de RSVP */
function attachRsvpHandlers() {
  const forms = document.querySelectorAll('.rsvp-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const eventId = form.dataset.event;
      const input = form.querySelector('input[type="email"]');
      const msg = form.querySelector('.rsvp-msg');
      const email = input.value.trim();
      if (!email) {
        msg.textContent = 'Ingresa un correo válido.';
        return;
      }
      const success = saveRsvp({ eventId, email, timestamp: new Date().toISOString() });
      if (!success) {
        msg.textContent = 'Ya te registraste para este evento.';
        return;
      }
      msg.textContent = 'Registro exitoso. ¡Gracias!';
      input.value = '';
    });
  });
}

/* Toggle mostrar eventos pasados */
function initPastToggle() {
  const btn = document.getElementById('show-past');
  if (!btn) return;
  let showingPast = false;
  btn.addEventListener('click', () => {
    showingPast = !showingPast;
    btn.textContent = showingPast ? 'Ocultar eventos pasados' : 'Mostrar eventos pasados';
    renderEvents(showingPast);
  });
}

/* Inicialización específica */
document.addEventListener('DOMContentLoaded', () => {
  renderEvents(false);
  initPastToggle();
});
