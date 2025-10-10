const EVENTS_KEY = 'vv_events_rsvps';

const events = [
  {
    id: 'evt1',
    title: 'Composting workshop',
    date: '2025-10-24',
    time: '10:00',
    location: 'Central square',
    description: 'Learn how to turn waste into compost for your pots.',
    img: 'images/event-compost.jpg'
  },
  {
    id: 'evt2',
    title: 'Fall planting',
    date: '2025-11-02',
    time: '09:00',
    location: 'Plot 3',
    description: 'We will plant fall vegetables and share seeds.',
    img: 'images/event-planting.jpg'
  },
  {
    id: 'evt3',
    title: 'Volunteer day',
    date: '2025-09-20',
    time: '08:00',
    location: 'The entire garden',
    description: 'General cleaning and maintenance of the community garden.',
    img: 'images/event-volunteer.jpg'
  }
];

function loadRsvps() {
  return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
}

function saveRsvp(rsvp) {
  const list = loadRsvps();
  const exists = list.some(r => r.eventId === rsvp.eventId && r.email === rsvp.email);
  if (exists) return false;
  list.push(rsvp);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(list));
  return true;
}

function isFuture(eventDate) {
  const today = new Date();
  const d = new Date(eventDate);
  d.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  return d >= today;
}

function renderEvents(showPast = false) {
  const container = document.getElementById('event-list');
  if (!container) return;
  const list = events.filter(ev => showPast ? true : isFuture(ev.date));
  if (list.length === 0) {
    container.innerHTML = `<p class="muted">There are no events available!!</p>`;
    return;
  }
  container.innerHTML = list.map(ev => {
    return `
      <article class="event" aria-labelledby="title-${ev.id}">
        <img src="${ev.img}" alt="${ev.title}" loading="lazy" width="320" height="200">
        <div>
          <h3 id="title-${ev.id}">${ev.title}</h3>
          <p class="muted">${ev.date} • ${ev.time} — ${ev.location}</p>
          <p>${ev.description}</p>
          <form class="rsvp-form" data-event="${ev.id}">
            <label for="email-${ev.id}" class="sr-only">mail to... RSVP</label>
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
        msg.textContent = 'Please enter a valid email address.';
        return;
      }
      const success = saveRsvp({ eventId, email, timestamp: new Date().toISOString() });
      if (!success) {
        msg.textContent = 'You have already registered for this event.';
        return;
      }
      msg.textContent = 'Registration successful. Thank you!';
      input.value = '';
    });
  });
}

function initPastToggle() {
  const btn = document.getElementById('show-past');
  if (!btn) return;
  let showingPast = false;
  btn.addEventListener('click', () => {
    showingPast = !showingPast;
    btn.textContent = showingPast ? 'Hide past events' : 'Show past events';
    renderEvents(showingPast);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderEvents(false);
  initPastToggle();
});
