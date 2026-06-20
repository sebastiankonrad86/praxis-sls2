const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const navLinks = nav.querySelectorAll("a");
const disorderMenu = nav.querySelector(".nav-disorders");

function closeMenu() {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
  disorderMenu?.removeAttribute("open");
  document.body.classList.remove("menu-open");
}

toggle.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("click", (event) => {
  if (disorderMenu?.open && !disorderMenu.contains(event.target)) {
    disorderMenu.removeAttribute("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
