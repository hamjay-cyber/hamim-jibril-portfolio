const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion-enabled");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

function closeMenu(returnFocus = false) {
  mainNav?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (returnFocus) menuToggle?.focus();
}
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && mainNav?.classList.contains("open")) closeMenu(true);
});
document.addEventListener("click", event => {
  if (mainNav?.classList.contains("open") && !mainNav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", event => {
  if (event.matches) closeMenu();
});
