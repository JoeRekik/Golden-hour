/*
 * Simple client‑side JavaScript for the Golden Hour site.
 *
 * This script manages tabbed navigation on the dashboards page. When a
 * user clicks on a tab button, the corresponding dashboard section is
 * shown while hiding the others. A default tab is activated on load.
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.dashboard-tabs button');
  const tabContents = document.querySelectorAll('.dashboard-content');

  function activateTab(index) {
    tabButtons.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('active');
        tabContents[i].classList.add('active');
      } else {
        btn.classList.remove('active');
        tabContents[i].classList.remove('active');
      }
    });
  }

  tabButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => activateTab(i));
  });

  // Activate the first tab by default if any exist
  if (tabButtons.length > 0) {
    activateTab(0);
  }
});