/*
 * Golden Hour – tabs controller for dashboards.html
 * Works with:
 *   <button class="tab" data-tab="btc">...</button>
 *   <section id="btc" class="tab-pane">...</section>
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabs  = Array.from(document.querySelectorAll('.tab'));
  const panes = Array.from(document.querySelectorAll('.tab-pane'));

  if (!tabs.length || !panes.length) return;

  function activate(targetId) {
    // If no valid id passed, default to first tab's target
    const fallback = tabs[0]?.dataset.tab;
    const id = panes.some(p => p.id === targetId) ? targetId : fallback;

    // Toggle active classes
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    panes.forEach(p => p.classList.toggle('active', p.id === id));

    // Update URL hash (no scroll jump)
    if (id && location.hash !== `#${id}`) {
      history.replaceState(null, '', `#${id}`);
    }
  }

  // Click handlers
  tabs.forEach(t => {
    t.addEventListener('click', () => activate(t.dataset.tab));
    // Basic keyboard support
    t.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(t.dataset.tab);
      }
    });
  });

  // Initial state from hash or first tab
  const initial = location.hash ? location.hash.slice(1) : tabs[0].dataset.tab;
  activate(initial);

  // If someone changes the hash manually (or via back/forward)
  window.addEventListener('hashchange', () => {
    const target = location.hash.slice(1);
    activate(target);
  });
});
