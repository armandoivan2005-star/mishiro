"use strict";

const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
const siteHeader = document.querySelector(".site-header");
const installButton = document.querySelector("#installButton");
const networkStatus = document.querySelector("#networkStatus");
let deferredInstallPrompt = null;

function closeMenu() {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
}

menuButton.addEventListener("click", () => {
  const opening = !navLinks.classList.contains("open");
  navLinks.classList.toggle("open", opening);
  menuButton.setAttribute("aria-expanded", String(opening));
  menuButton.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const sectionLinks = [...navLinks.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  sectionLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
}, { rootMargin: "-25% 0px -60%", threshold: [0, .2, .5] });

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => siteHeader.classList.toggle("scrolled", window.scrollY > 90), { passive: true });

function updateNetworkStatus() {
  const online = navigator.onLine;
  networkStatus.classList.toggle("offline", !online);
  networkStatus.querySelector("span").textContent = online ? "Disponible en línea" : "Disponible sin conexión";
}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);
updateNetworkStatus();

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.classList.remove("hidden");
});

installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.classList.add("hidden");
});

window.addEventListener("appinstalled", () => installButton.classList.add("hidden"));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const registration = await navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" });
    registration.update();
  });
}
