/* resources.js - listado de guías y filtros por temporada usando arrays, .filter(), template literals */

const guides = [
  { id: 'g1', title: 'Tomates en contenedor', season: 'spring', summary: 'Cultiva tomates en maceta, necesidades de sol y riego.', img: 'images/guide-tomato.jpg' },
  { id: 'g2', title: 'Plantas de hoja de otoño', season: 'fall', summary: 'Lechugas y espinacas ideales para otoño.', img: 'images/guide-lettuce.jpg' },
  { id: 'g3', title: 'Preparar compost', season: 'all', summary: 'Cómo iniciar compost y mantener la proporción correcta.', img: 'images/guide-compost.jpg' },
  { id: 'g4', title: 'Cosecha de invierno', season: 'winter', summary: 'Qué plantar y cómo proteger cultivos en clima frío.', img: 'images/guide-winter.jpg' }
];

/* Renderiza guías filtradas */
function renderGuides(season = 'all') {
  const container = document.getElementById('resources-list');
  if (!container) return;
  let list = guides;
  if (season !== 'all') {
    list = guides.filter(g => g.season === season || g.season === 'all');
  }
  if (!list.length) {
    container.innerHTML = `<p class="muted">No hay recursos para esta temporada.</p>`;
    return;
  }
  container.innerHTML = list.map(g => `
    <article class="card">
      <img src="${g.img}" alt="${g.title}" loading="lazy" width="640" height="400">
      <h3>${g.title}</h3>
      <p class="muted">${g.season === 'all' ? 'Todas las estaciones' : capitalize(g.season)}</p>
      <p>${g.summary}</p>
    </article>
  `).join('');
}

/* Capitalizar helper (ejemplo de otra función) */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/* Filtros: escucha botones y re-renderiza */
function initFilters() {
  const buttons = document.querySelectorAll('.filters [data-season]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const season = btn.dataset.season;
      renderGuides(season);
    });
  });
}

/* Inicialización */
document.addEventListener('DOMContentLoaded', () => {
  renderGuides('all');
  initFilters();
});
