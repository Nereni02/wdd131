const JOIN_KEY = 'vv_join_requests';
function getJoinRequests() {
  return JSON.parse(localStorage.getItem(JOIN_KEY) || '[]');
}

function addJoinRequest(request) {
  const list = getJoinRequests();
  list.push(request);
  localStorage.setItem(JOIN_KEY, JSON.stringify(list));
}

function validateJoin(data) {
  if (!data.name || !data.email || !data.role) return false;
  const re = /\S+@\S+\.\S+/;
  return re.test(data.email);
}

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
      confirm.textContent = 'Please fill in the required fields correctly.';
      confirm.className = 'muted';
      return;
    }

    addJoinRequest(data);
    confirm.textContent = `Thank you, ${data.name}. Your request has been saved. We will contact you at ${data.email}.`;
    confirm.className = 'muted';
    form.reset();
  });

  clearBtn?.addEventListener('click', () => {
    form.reset();
    confirm.textContent = '';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initJoinForm();
});
