document.addEventListener('DOMContentLoaded', function() {
  const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
  const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
  const localStorageKey = 'hideInfoModal';

  // Check if the user has opted to hide the modal
  if (localStorage.getItem(localStorageKey) !== 'true') {
    infoModal.show();
  }

  // Add an event listener for when the modal is hidden
  const myModalEl = document.getElementById('infoModal');
  myModalEl.addEventListener('hidden.bs.modal', function() {
    // If the checkbox is checked, save the preference to local storage
    if (dontShowAgainCheckbox.checked) {
      localStorage.setItem(localStorageKey, 'true');
    }
  });
});