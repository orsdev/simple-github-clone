document
  .getElementById('header--nav-toggle')
  .addEventListener('click', (e) => {
    const getElement = document.querySelector(
      '.header--mobile-bottom'
    );
    getElement.classList.toggle('show-nav');
  });
