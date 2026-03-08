(() => {
  if (document.head.dataset.headIncludeLoaded === 'true') {
    return;
  }

  fetch('includes/head.html')
    .then(response => response.text())
    .then(html => {
      document.head.insertAdjacentHTML('afterbegin', html);
      document.head.dataset.headIncludeLoaded = 'true';
    })
    .catch(error => console.error('Error loading head include:', error));
})();
