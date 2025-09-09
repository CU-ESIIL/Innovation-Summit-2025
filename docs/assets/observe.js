// Run after Material's instant loading swaps pages
document$.subscribe(() => {
  const els = Array.from(document.querySelectorAll('.aos'));
  if (!els.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
});

