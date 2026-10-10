/* Résidence de la Forêt Verte — interactions légères.
   Le site reste entièrement lisible sans JavaScript. */
(function () {
  "use strict";

  /* ---------- Sommaire (tiroir mobile) ---------- */
  var toc = document.getElementById("sommaire");
  var scrim = document.querySelector(".scrim");
  var openBtn = document.querySelector("[data-menu-open]");

  function openMenu() {
    toc.classList.add("is-open");
    scrim.hidden = false;
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var first = toc.querySelector("a, button");
    if (first) first.focus();
  }
  function closeMenu(returnFocus) {
    if (!toc.classList.contains("is-open")) return;
    toc.classList.remove("is-open");
    scrim.hidden = true;
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (returnFocus) openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener("click", openMenu);
  document.querySelectorAll("[data-menu-close]").forEach(function (el) {
    el.addEventListener("click", function () { closeMenu(true); });
  });
  toc.querySelectorAll("a[href^='#']").forEach(function (a) {
    a.addEventListener("click", function () { closeMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu(true);
  });

  /* ---------- Rubrique en cours dans le sommaire ---------- */
  var links = Array.prototype.slice.call(toc.querySelectorAll(".toc__list a"));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  if ("IntersectionObserver" in window) {
    var visible = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible.set(en.target, en.isIntersecting); });
      var current = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible.get(sections[i])) { current = i; break; }
      }
      if (current === null) return;
      links.forEach(function (a, i) {
        if (i === current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { if (s) io.observe(s); });
  }

  /* ---------- Collectes : prochain mardi + jour courant ---------- */
  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var today = new Date();
  var dow = today.getDay();
  var delta = (2 - dow + 7) % 7; // 2 = mardi
  var next = new Date(today.getFullYear(), today.getMonth(), today.getDate() + delta);
  var label = delta === 0 ? "aujourd’hui" : (delta === 1 ? "demain, " : "") + JOURS[2] + " " + next.getDate() + " " + MOIS[next.getMonth()];
  if (delta === 0) label = "aujourd’hui (mardi)";

  var quick = document.querySelector("[data-next-tuesday]");
  if (quick) quick.textContent = delta === 0 ? "Aujourd’hui" : (delta === 1 ? "Demain, mardi" : "Mardi " + next.getDate() + " " + MOIS[next.getMonth()]);

  var box = document.querySelector("[data-next-box]");
  var txt = document.querySelector("[data-next-text]");
  if (box && txt) {
    txt.innerHTML = "Prochaine collecte des ordures ménagères et des papiers : <strong>" + label + "</strong>";
    box.hidden = false;
  }

  document.querySelectorAll(".week [data-day='" + dow + "'], .agenda [data-day='" + dow + "']").forEach(function (el) {
    el.classList.add("is-today");
    if (el.matches(".week__row--head span")) el.setAttribute("aria-label", el.textContent + " (aujourd’hui)");
  });

  /* ---------- Bouton retour en haut ---------- */
  var totop = document.querySelector("[data-totop]");
  if (totop) {
    var onScroll = function () { totop.classList.toggle("is-visible", window.scrollY > 900); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Visionneuse d'images ---------- */
  var dlg = document.querySelector("[data-lightbox-dialog]");
  var dlgImg = document.querySelector("[data-lightbox-img]");
  if (dlg && typeof dlg.showModal === "function") {
    document.querySelectorAll("[data-lightbox]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var img = a.querySelector("img");
        dlgImg.src = a.getAttribute("href");
        dlgImg.alt = img ? img.alt : "";
        dlg.showModal();
      });
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target === dlgImg) dlg.close(); });
    document.querySelector("[data-lightbox-close]").addEventListener("click", function () { dlg.close(); });
  }
})();
