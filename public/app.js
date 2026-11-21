const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.favorite-button').forEach((button) => {
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('is-favorite');
    button.textContent = saved ? '♥' : '♡';
    button.setAttribute('aria-pressed', String(saved));
  });
});

document.querySelector('#sort-button')?.addEventListener('click', (event) => {
  const grid = document.querySelector('#product-grid');
  if (!grid) return;
  const button = event.currentTarget;
  const ascending = button.dataset.order !== 'ascending';
  button.dataset.order = ascending ? 'ascending' : 'descending';
  button.innerHTML = `${ascending ? 'Price: low to high' : 'Price: high to low'} <span>⌄</span>`;
  [...grid.children]
    .sort((a, b) => (Number(a.dataset.price) - Number(b.dataset.price)) * (ascending ? 1 : -1))
    .forEach((card) => grid.append(card));
});

document.querySelector('#newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  document.querySelector('.newsletter-message').textContent = `You're on the list. See you soon, ${email.value}!`;
  email.value = '';
});
