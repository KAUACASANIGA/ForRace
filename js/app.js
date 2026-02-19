(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const topGap = 18;

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const desiredTop = targetTop - topGap;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = Math.min(Math.max(desiredTop, 0), Math.max(maxScrollTop, 0));

    window.scrollTo({
      top: scrollTop,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });

    history.pushState(null, "", hash);
  });
})();
