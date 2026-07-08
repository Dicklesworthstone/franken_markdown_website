/* Site chrome: header state, scroll reveals, glitch text, the monster eye,
   hero terminal typing, count-up stats, copy buttons. */

import { animateCount } from "./viz.js?v=6";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --- Header: transparent -> glass on scroll --- */
const header = document.getElementById("site-header");
if (header) {
  let ticking = false;
  const apply = () => {
    const scrolled = window.scrollY > 20;
    header.classList.toggle("glass-modern", scrolled);
    header.classList.toggle("shadow-2xl", scrolled);
    header.classList.toggle("scale-[0.98]", scrolled);
    header.classList.toggle("border-emerald-500/20", scrolled);
    header.classList.toggle("border-transparent", !scrolled);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  }, { passive: true });
  apply();
}

/* --- Mobile menu --- */
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
if (menuButton && mobileMenu) {
  const setOpen = (open) => {
    mobileMenu.classList.toggle("translate-x-full", !open);
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuButton.addEventListener("click", () => {
    setOpen(mobileMenu.classList.contains("translate-x-full"));
  });
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a") || event.target === mobileMenu) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

/* --- Scroll reveals --- */
const revealables = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: "-40px" });
  for (const node of revealables) io.observe(node);
} else {
  for (const node of revealables) node.classList.add("revealed");
}

/* --- Count-up stats (outside viz containers) --- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: "0px" });
  for (const node of document.querySelectorAll("[data-count-to]")) {
    // Counters inside the deps visualization animate when that viz
    // initializes; a complex :not() selector here would throw on older
    // browsers and kill the rest of this module.
    if (node.closest("#viz-deps")) continue;
    io.observe(node);
  }
}

/* --- Glitch text: hover + occasional random spasm --- */
const glitchers = document.querySelectorAll(".franken-glitch");
for (const node of glitchers) {
  if (!node.dataset.glitch) node.dataset.glitch = node.textContent.trim();
  let timer = 0;
  const start = () => {
    if (reducedMotion) return;
    node.classList.add("glitching");
    window.clearTimeout(timer);
    timer = window.setTimeout(() => node.classList.remove("glitching"), 260);
  };
  node.addEventListener("mouseenter", start);
  node.addEventListener("touchstart", start, { passive: true });
}
if (!reducedMotion && glitchers.length > 0) {
  window.setInterval(() => {
    if (Math.random() > 0.8) {
      const pick = glitchers[Math.floor(Math.random() * glitchers.length)];
      pick.classList.add("glitching");
      window.setTimeout(() => pick.classList.remove("glitching"), 150 + Math.random() * 200);
    }
  }, 3000);
}

/* --- The monster eye: pupil tracking, blinking, bloodshot proximity --- */
const eye = document.getElementById("franken-eye");
if (eye) {
  const iris = eye.querySelector(".eye-iris");
  const veins = eye.querySelector(".eye-veins");
  const lidTop = eye.querySelector(".eye-lid-top");
  const lidBottom = eye.querySelector(".eye-lid-bottom");
  let rect = null;
  let raf = 0;

  const refreshRect = () => { rect = eye.getBoundingClientRect(); };
  refreshRect();
  window.addEventListener("scroll", refreshRect, { passive: true });
  window.addEventListener("resize", refreshRect, { passive: true });

  if (!reducedMotion) {
    window.addEventListener("mousemove", (event) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const moveDist = Math.min(rect.width / 4, distance / 15);
        iris.style.transform = `translate(${Math.cos(angle) * moveDist}px, ${Math.sin(angle) * moveDist}px)`;
        if (veins) veins.style.opacity = String(Math.max(0.05, 1 - distance / 400) * 0.45);
      });
    }, { passive: true });

    window.setInterval(() => {
      if (Math.random() > 0.8) {
        lidTop.style.transform = "scaleY(1)";
        lidBottom.style.transform = "scaleY(1)";
        window.setTimeout(() => {
          lidTop.style.transform = "scaleY(0)";
          lidBottom.style.transform = "scaleY(0)";
        }, 120);
      }
    }, 2500);
  }
}

/* --- Hero terminal typing --- */
const terminal = document.getElementById("hero-terminal");
if (terminal) {
  // Sizes/hash are real showcase.md renders; the demonstration that matters
  // is the EQUALITY of the two hashes (deterministic bytes), which stays true
  // even as engine development drifts the exact values.
  const LINES = [
    { text: "$ fmd README.md --to both --out README.html", cls: "cmd" },
    { text: "  parse: 1 document -> 1 AST", cls: "out" },
    { text: "  README.html   90,364 B  self-contained", cls: "out" },
    { text: "  README.pdf    59,305 B  tagged, deterministic", cls: "out" },
    { text: "$ fmd README.md --to pdf --out rerun.pdf   # render again", cls: "cmd" },
    { text: "$ sha256sum README.pdf rerun.pdf", cls: "cmd" },
    { text: "  09a7d729c37b92cc...  README.pdf", cls: "out" },
    { text: "  09a7d729c37b92cc...  rerun.pdf", cls: "out" }
  ];

  function lineHtml(line, upTo) {
    const shown = line.text.slice(0, upTo);
    let html = "";
    for (const ch of shown) {
      if (ch === "$") html += `<span class="text-emerald-500 font-bold">$</span>`;
      else if (line.cls === "cmd") html += `<span class="text-white font-bold">${escapeChar(ch)}</span>`;
      else if (/[0-9,]/.test(ch)) html += `<span class="text-white">${escapeChar(ch)}</span>`;
      else html += `<span class="text-slate-500">${escapeChar(ch)}</span>`;
    }
    return html;
  }

  function escapeChar(ch) {
    if (ch === "&") return "&amp;";
    if (ch === "<") return "&lt;";
    if (ch === ">") return "&gt;";
    return ch;
  }

  function renderTerminal(lineIndex, charIndex) {
    let html = "";
    for (let i = 0; i <= lineIndex && i < LINES.length; i++) {
      const upTo = i < lineIndex ? LINES[i].text.length : charIndex;
      html += lineHtml(LINES[i], upTo) + "\n";
    }
    terminal.innerHTML = html + `<span class="caret-blink inline-block w-1.5 h-4 bg-emerald-500 align-text-bottom"></span>`;
  }

  if (reducedMotion) {
    renderTerminal(LINES.length - 1, LINES[LINES.length - 1].text.length);
  } else {
    whenSeen(terminal, () => {
      let li = 0;
      let ci = 0;
      const step = () => {
        if (li >= LINES.length) return;
        ci += 1 + Math.floor(Math.random() * 2);
        if (ci >= LINES[li].text.length) {
          ci = LINES[li].text.length;
          renderTerminal(li, ci);
          li += 1;
          ci = 0;
          window.setTimeout(step, LINES[li - 1].cls === "cmd" ? 260 : 90);
          return;
        }
        renderTerminal(li, ci);
        window.setTimeout(step, 18);
      };
      step();
    });
  }
}

function whenSeen(el, run) {
  if (!("IntersectionObserver" in window)) {
    run();
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        io.disconnect();
        run();
      }
    }
  });
  io.observe(el);
}

/* --- Copy buttons --- */
for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    if (button.textContent === "COPIED") return; // double-click would capture "COPIED" as the restore text
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = "COPIED";
      button.classList.add("text-emerald-400");
      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove("text-emerald-400");
      }, 1400);
    } catch {
      /* clipboard unavailable (permissions) — leave the command selectable */
    }
  });
}

/* --- Footer year + back to top --- */
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}
