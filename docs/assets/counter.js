document$.subscribe(() => {
  const el = document.getElementById('countdown');
  if (!el) return;

  // Respect reduced motion (still updates text, no animation loops)
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const startMs = new Date('2025-09-23T08:30:00-06:00').getTime();
  const plural = (n, u) => `${n} ${u}${n === 1 ? '' : 's'}`;

  const render = () => {
    const delta = startMs - Date.now();
    if (delta <= 0) {
      el.textContent = "It's Summit week!";
      return false; // stop
    }
    const d = Math.floor(delta / 864e5);
    const h = Math.floor(delta / 36e5) % 24;
    const m = Math.floor(delta / 6e4) % 60;
    el.textContent = `Starts in ${plural(d,'day')}, ${plural(h,'hour')}, ${plural(m,'minute')}`;
    return true; // keep going
  };

  const tick = () => {
    if (!render()) return;
    // Use requestAnimationFrame for a lightweight loop; throttle via setTimeout to ~1/min
    setTimeout(() => (reduceMotion ? render() : requestAnimationFrame(tick)), 60000);
  };

  render();
  tick();
});

