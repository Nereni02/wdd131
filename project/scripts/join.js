/* join.js - manejo del formulario de inscripción (localStorage, validación y DOM updates) */

const JOIN_KEY = 'vv_join_requests';

/* Obtener solicitudes almacenadas */
function getJoinRequests() {
  return JSON.parse(localStorage.getItem(JOIN_KEY) || '[]');
}

/* Guardar solicitud nueva */
function addJoinRequest(request) {
  const list = getJoinRequests();
  list.push(request);
  localStorage.setItem(JOIN_KEY, JSON.stringify(list));
}

/* Validación simple (podrías ampliar) */
function validateJoin(data) {
  if (!data.name || !data.email || !data.role) return false;
  // email básica
  const re = /\S+@\S+\.\S+/;
  return re.test(data.email);
}

/* Manejar envío del formulario */
function initJoinForm() {
  const form = document.getElementById('join-form');
  const confirm = document.getElementById('join-confirm');
  const clearBtn = document.getElementById('clear-btn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      role: form.role.value,
      comments: form.comments.value.trim(),
      submitted: new Date().toISOString()
    };

    if (!validateJoin(data)) {
      confirm.textContent = 'Por favor completa los campos requeridos correctamente.';
      confirm.className = 'muted';
      return;
    }

    addJoinRequest(data);
    confirm.textContent = `Gracias, ${data.name}. Tu solicitud fue guardada. Te contactaremos por ${data.email}.`;
    confirm.className = 'muted';
    form.reset();
  });

  clearBtn?.addEventListener('click', () => {
    form.reset();
    confirm.textContent = '';
  });
}

/* Inicializador */
document.addEventListener('DOMContentLoaded', () => {
  initJoinForm();
});
