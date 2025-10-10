
const guides = [
  { id: 'g1', title: 'Tomatoes in containers', season: 'spring', summary: 'Grow tomatoes in pots, sun and watering requirements.', img: 'images/guide-tomato.jpg' },
  { id: 'g2', title: 'Fall leafy greens', season: 'fall', summary: 'Lettuce and spinach ideal for fall.', img: 'images/guide-lettuce.jpg' },
  { id: 'g3', title: 'Composting basics', season: 'all', summary: 'How to start composting and maintain the right balance.', img: 'images/guide-compost.jpg' },
  { id: 'g4', title: 'Winter harvest', season: 'winter', summary: 'What to plant and how to protect crops in cold weather.', img: 'images/guide-winter.jpg' }
];

function renderGuides(season = 'all') {
  const container = document.getElementById('resources-list');
  if (!container) return;
  let list = guides;
  if (season !== 'all') {
    list = guides.filter(g => g.season === season || g.season === 'all');
  }
  if (!list.length) {
    container.innerHTML = `<p class="muted">There are no resources for this season.</p>`;
    return;
  }
  container.innerHTML = list.map(g => `
    <article class="card">
      <img src="${g.img}" alt="${g.title}" loading="lazy" width="640" height="400">
      <h3>${g.title}</h3>
      <p class="muted">${g.season === 'all' ? 'All seasons' : capitalize(g.season)}</p>
      <p>${g.summary}</p>
    </article>
  `).join('');
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function initFilters() {
  const buttons = document.querySelectorAll('.filters [data-season]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const season = btn.dataset.season;
      renderGuides(season);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderGuides('all');
  initFilters();
});
