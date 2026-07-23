/* CDEFGAB Music Toolkit — site behaviour.
   Vanilla, no dependencies. Progressive: the page is fully usable without JS. */
(function () {
  "use strict";

  /* ---- theme: remember the visitor's choice, otherwise follow the system ---- */
  var root = document.documentElement;
  var KEY = "cdefgab-theme";

  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (e) { /* private mode — just follow the system */ }

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    var paint = function () {
      var t = currentTheme();
      toggle.textContent = t === "dark" ? "☀" : "☾";
      toggle.setAttribute("aria-label", t === "dark" ? "Switch to light appearance" : "Switch to dark appearance");
    };
    paint();
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      paint();
    });
  }

  /* ---- sticky header hairline ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- scroll reveal ---- */
  var targets = document.querySelectorAll(".reveal");
  if (targets.length) {
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      targets.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- play demo videos only while visible (saves data, keeps the page calm) ---- */
  var vids = document.querySelectorAll("video[data-autoplay]");
  if (vids.length && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.35 });
    vids.forEach(function (v) { vio.observe(v); });
  }
})();
