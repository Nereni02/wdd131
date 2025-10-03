// Product array
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// Populate Product Name select element
const productSelect = document.getElementById('product');
products.forEach(product => {
  const option = document.createElement('option');
  option.value = product.id; // use id for value
  option.textContent = product.name; // use name for display
  productSelect.appendChild(option);
});

// LocalStorage counter for reviews (on review.html page)
if (window.location.pathname.endsWith('review.html')) {
  let reviewCount = localStorage.getItem('reviewCount');
  reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
  localStorage.setItem('reviewCount', reviewCount);

  // Display counter on the page if an element exists
  const counterEl = document.getElementById('reviewCounter');
  if (counterEl) {
    counterEl.textContent = reviewCount;
  }
}
