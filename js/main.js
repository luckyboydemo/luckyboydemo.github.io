/* =====================================================================
   Smart Online Service — UI wiring (nav, ticker, services, footer)
   ===================================================================== */
const $ = (sel) => document.querySelector(sel);
const cfg = SITE_CONFIG;
const waUrl = (message = "Hi! I'd like to know more about Smart Online Service.") =>
  `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message)}`;
const setHref = (id, href) => { const el = document.getElementById(id); if (el) el.href = href; };

/* ---- Mobile nav ------------------------------------------------------- */
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}));

/* ---- Links ------------------------------------------------------------ */
["ctaWhatsapp", "floatWhatsapp"].forEach((id) => setHref(id, waUrl()));
setHref("communityJoinBtn", cfg.whatsappGroupUrl);
setHref("rateBtn", cfg.googleReviewUrl);
setHref("feedbackBtn", `mailto:${cfg.email}?subject=${encodeURIComponent("Feedback for Smart Online Service")}`);
setHref("fpIg", cfg.instagram);
setHref("fpYt", cfg.youtube);
setHref("heroIg", cfg.instagram);
setHref("wwdRewriteBtn", waUrl("Hi! I'd like the ATS Resume Rewrite service (" + (cfg.rewritePrice || "₹349") + ") ."));
setHref("heroWaBtn", waUrl("Hi! I'd like to get my resume rewritten."));

/* ---- Rolling highlights ticker ---------------------------------------- */
const tickerItem = (t) => `<span>${t}</span><i>✦</i>`;
const tickerTrack = $("#tickerTrack");
if (tickerTrack && Array.isArray(cfg.highlights)) {
  const seq = cfg.highlights.map(tickerItem).join("");
  tickerTrack.innerHTML = seq + seq;        // duplicated for a seamless loop
}
const reviewTicker = $("#reviewTicker");
if (reviewTicker && Array.isArray(cfg.reviews)) {
  const seq = cfg.reviews.map(tickerItem).join("");
  reviewTicker.innerHTML = seq + seq;
}

/* ---- Hero stats (count-up animation) ---------------------------------- */
// Each numeric stat ticks up from 1 to its target over ~3.4s on page load,
// preserving any suffix like "+". Respects reduced-motion preferences.
const heroStats = $("#heroStats");
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function countUp(el, target, suffix, duration) {
  if (reduceMotion) { el.textContent = target + suffix; return; }
  const start = performance.now();
  let done = false;
  const finish = () => { if (!done) { done = true; el.textContent = target + suffix; } };
  const tick = (now) => {
    if (done) return;
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);                 // easeOutCubic
    el.textContent = Math.max(1, Math.round(1 + (target - 1) * eased)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else finish();
  };
  requestAnimationFrame(tick);
  // Safety net: rAF is paused in background tabs — guarantee the final value
  // still lands if the visitor switches away before the animation finishes.
  setTimeout(finish, duration + 400);
}
(cfg.stats || []).forEach((s) => {
  const d = document.createElement("div");
  d.className = "hstat";
  const m = String(s.value).match(/^(\d+)(.*)$/);          // split "100+" -> 100, "+"
  d.innerHTML = `<div class="n">${m ? "1" + m[2] : s.value}</div><div class="l">${s.label}</div>${s.sub ? `<div class="s">${s.sub}</div>` : ""}`;
  heroStats.appendChild(d);
  if (m) countUp(d.querySelector(".n"), parseInt(m[1], 10), m[2] || "", 3400);
});

/* ---- Hero resume showcase — cycles through the sample templates -------- */
(function () {
  const stack = document.querySelector(".hv-stack");
  const shots = stack ? Array.prototype.slice.call(stack.querySelectorAll(".hv-shot")) : [];
  if (!stack || shots.length < 2) return;

  let idx = -1, timer = null;

  function show(n) {
    shots.forEach((img, k) => { img.style.opacity = k === n ? "1" : "0"; });
  }
  function next() { idx = (idx + 1) % shots.length; show(idx); }

  next();   // paint the first shot immediately
  if (!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    timer = setInterval(next, 3400);
    document.addEventListener("visibilitychange", () => {
      clearInterval(timer);
      if (!document.hidden) timer = setInterval(next, 3400);
    });
  }
})();

/* ---- Services (homepage carousel; the full list lives on services.html) */
const servicesGrid = $("#servicesGrid");
if (servicesGrid) (cfg.services || []).forEach((svc) => {
  const card = document.createElement("article");
  const feats = (svc.feats || []).map((f) => `<div>${f}</div>`).join("");

  // Free gift card (HR contacts) — highlighted inside the grid.
  if (svc.free) {
    card.className = "svc-card free-card reveal";
    card.innerHTML = `
      <span class="gift-badge">🎁 FREE</span>
      <div class="svc-num">FREE GIFT</div>
      <h3 class="svc-title">${svc.title}</h3>
      <div class="svc-feats">${feats}</div>
      <div class="svc-price-row">
        <div class="svc-price"><strong>${svc.price}</strong><small>${svc.priceNote}</small></div>
        <a class="svc-cta-link" href="${cfg.hrContactsUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open the free HR directory">Open →</a>
      </div>`;
    servicesGrid.appendChild(card);
    return;
  }

  card.className = `svc-card reveal${svc.featured ? " featured" : ""}${svc.flagship ? " flagship" : ""}`;
  const cta = svc.href
    ? `<a class="svc-cta-link" href="${svc.href}" aria-label="Explore ${svc.title}">Explore →</a>`
    : `<a class="svc-cta-link" href="${waUrl(svc.whatsappMsg)}" target="_blank" rel="noopener noreferrer" aria-label="Enquire about ${svc.title}">Get this →</a>`;
  const bonus = svc.bonus ? `<div class="bonus-line">🎁 ${svc.bonus} <span>included free</span></div>` : "";
  // Per-service "View sample" button. A service can either set its own `sampleUrl`
  // (e.g. the templates card) or use `sample: true` to fall back to the shared
  // report sample link. The button only renders when the link is a real URL.
  const sampleHref = svc.sampleHref || svc.sampleUrl || "";
  const sampleLabel = svc.sampleLabel || "View sample report";
  const sampleExt = /^https?:\/\//i.test(sampleHref || "");
  const sample = sampleHref
    ? `<a class="sample-report-link" href="${sampleHref}"${sampleExt ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="${sampleLabel}"><span>★</span> ${sampleLabel}</a>`
    : "";
  card.innerHTML = `
    ${svc.featured ? `<span class="best-tag">${svc.tagLabel || "BEST VALUE"}</span>` : ""}
    <div class="svc-num">SERVICE ${svc.id}</div>
    <h3 class="svc-title">${svc.title}</h3>
    <div class="svc-feats">${feats}</div>
    ${bonus}
    ${sample}
    <div class="svc-price-row">
      <div class="svc-price"><strong>${svc.price}</strong><small>${svc.priceNote}</small></div>
      ${cta}
    </div>`;
  servicesGrid.appendChild(card);
});

/* ---- Services carousel (auto-rolling + left/right arrows) -------------- */
(function () {
  const track = servicesGrid;
  const carousel = $("#svcCarousel");
  if (!track || !carousel) return;
  const prev = $("#svcPrev"), next = $("#svcNext");

  // Width of one card + the flex gap, so each step lands on the next card.
  const step = () => {
    const c = track.querySelector(".svc-card");
    const gap = parseFloat(getComputedStyle(track).columnGap || "22") || 22;
    return c ? c.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  };
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  const atStart = () => track.scrollLeft <= 4;
  const goNext = (loop) => {
    if (loop && atEnd()) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollBy({ left: step(), behavior: "smooth" });
  };
  const goPrev = () => {
    if (atStart()) track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    else track.scrollBy({ left: -step(), behavior: "smooth" });
  };

  // Smooth, continuous "marquee" auto-scroll — premium feel, ~3 tiles gliding.
  let raf = null;
  const SPEED = 0.7;                       // px per frame ≈ 42px/s
  const tick = () => {
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) track.scrollLeft = 0;
    else track.scrollLeft += SPEED;
    raf = requestAnimationFrame(tick);
  };
  const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };
  const start = () => { stop(); raf = requestAnimationFrame(tick); };

  // Arrows pause the glide, step one card, then resume.
  if (next) next.addEventListener("click", () => { stop(); goNext(true); setTimeout(start, 900); });
  if (prev) prev.addEventListener("click", () => { stop(); goPrev(); setTimeout(start, 900); });
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("touchstart", stop, { passive: true });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else start(); });

  // Glide unless the visitor prefers reduced motion (arrows still work).
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && !document.hidden) start();
})();

/* ---- Rolling review tiles (landing) — auto-scroll + arrows ------------ */
const reviewsRoll = $("#reviewsRoll");
if (reviewsRoll && Array.isArray(cfg.landingReviews)) {
  const rrCard = (r) => {
    const li = r.linkedin
      ? `<a class="rr-li" href="${r.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${r.name} on LinkedIn">in&nbsp;LinkedIn</a>` : "";
    return `
    <figure class="rr-card">
      <div class="rr-head"><span class="rr-avatar">${r.avatar || "🧑"}</span><div class="rr-stars">★★★★★</div></div>
      <blockquote>${r.text}</blockquote>
      <figcaption class="rr-who"><strong>${r.name}</strong><span>${r.role || ""}</span>${li ? `<div class="rr-caps">${li}</div>` : ""}</figcaption>
    </figure>`;
  };
  const rrSeq = cfg.landingReviews.map(rrCard).join("");
  reviewsRoll.innerHTML = rrSeq + rrSeq;   // duplicated so the loop feels endless

  const rrPrev = $("#rrPrev"), rrNext = $("#rrNext");
  const rrStep = () => {
    const c = reviewsRoll.querySelector(".rr-card");
    const gap = parseFloat(getComputedStyle(reviewsRoll).columnGap || "20") || 20;
    return c ? c.getBoundingClientRect().width + gap : 320;
  };
  // Continuous glide; wraps back to the first copy at the halfway point.
  let rrRaf = null;
  const rrTick = () => {
    const half = reviewsRoll.scrollWidth / 2;
    if (reviewsRoll.scrollLeft >= half) reviewsRoll.scrollLeft -= half;
    else reviewsRoll.scrollLeft += 0.6;
    rrRaf = requestAnimationFrame(rrTick);
  };
  const rrStop = () => { if (rrRaf) { cancelAnimationFrame(rrRaf); rrRaf = null; } };
  const rrStart = () => { rrStop(); rrRaf = requestAnimationFrame(rrTick); };
  if (rrNext) rrNext.addEventListener("click", () => { rrStop(); reviewsRoll.scrollBy({ left: rrStep(), behavior: "smooth" }); setTimeout(rrStart, 1200); });
  if (rrPrev) rrPrev.addEventListener("click", () => { rrStop(); reviewsRoll.scrollBy({ left: -rrStep(), behavior: "smooth" }); setTimeout(rrStart, 1200); });
  reviewsRoll.addEventListener("mouseenter", rrStop);
  reviewsRoll.addEventListener("mouseleave", rrStart);
  reviewsRoll.addEventListener("touchstart", rrStop, { passive: true });
  document.addEventListener("visibilitychange", () => { if (document.hidden) rrStop(); else rrStart(); });
  const rrReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!rrReduce && !document.hidden) rrStart();
}

/* ---- Follow logos under services -------------------------------------- */
const followLogos = $("#followLogos");
if (followLogos && window.SOS_ICON) {
  followLogos.innerHTML =
    `<a class="social-ico" href="${cfg.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${SOS_ICON.instagram}</a>` +
    `<a class="social-ico" href="${cfg.youtube}" target="_blank" rel="noopener noreferrer" aria-label="YouTube">${SOS_ICON.youtube}</a>`;
}

/* ---- Coming soon (Notify -> WhatsApp group) --------------------------- */
const comingGrid = $("#comingGrid");
(cfg.comingSoon || []).forEach((cs) => {
  const card = document.createElement("article");
  card.className = "cs-card astro reveal";
  card.innerHTML = `
    <div class="cs-orb">${cs.tag}</div>
    <h4>${cs.title}</h4>
    <div class="cs-role">${cs.sub}</div>
    <p>${cs.desc}</p>
    <div class="cs-foot">
      <span class="coming-soon-pill">Coming Soon</span>
      <a class="cs-notify" href="${cfg.whatsappGroupUrl}" target="_blank" rel="noopener noreferrer">Notify me →</a>
    </div>`;
  comingGrid.appendChild(card);
});

/* ---- Footer: colourful social icons ----------------------------------- */
if (typeof renderContactRow === "function") renderContactRow($("#socialRow"), cfg);

/* ---- Welcome launch-offer popup (once per session, auto-disappears) --- */
// Falls back to built-in copy so it still works even if config.js isn't updated;
// edit js/config.js -> launchOffer to change the text/date without touching code.
const launchPop = $("#launchPop");
const lo = cfg.launchOffer || {
  enabled: true,
  badge: "🤝 Proven results",
  title: "Our clients got placed at",
  sub: "Resumes, LinkedIn & Naukri profiles crafted by us — real offers from India's top companies.",
  validTill: ""
};
if (launchPop && lo && lo.enabled !== false) {
  const set = (id, txt) => { const el = document.getElementById(id); if (el && txt) el.textContent = txt; };
  set("lpBadge", lo.badge); set("lpTitle", lo.title); set("lpSub", lo.sub);
  setHref("lpIg", cfg.instagram);
  if (cfg.store) setHref("lpStore", cfg.store);

  // Duplicate each client-logo row once so the marquee loops seamlessly
  // (the CSS animation slides the track by exactly one set's width).
  launchPop.querySelectorAll(".lp-track").forEach((track) => {
    const logoSet = track.querySelector(".lp-set");
    if (logoSet) {
      const dup = logoSet.cloneNode(true);
      dup.setAttribute("aria-hidden", "true");
      track.appendChild(dup);
    }
  });

  let seen = false;
  try { seen = !!sessionStorage.getItem("tccLaunchSeen"); } catch (e) {}
  let hideTimer = null;
  const close = () => {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    launchPop.classList.add("lp-closing");
    setTimeout(() => { launchPop.hidden = true; launchPop.classList.remove("lp-closing"); }, 400);
  };
  const open = () => {
    launchPop.hidden = false;
    try { sessionStorage.setItem("tccLaunchSeen", "1"); } catch (e) {}
    hideTimer = setTimeout(close, 12000);   // disappears on its own after 12s
  };
  if (!seen) setTimeout(open, 1400);
  const lpClose = $("#lpClose");
  if (lpClose) lpClose.addEventListener("click", close);
  const lpBackdrop = $("#lpBackdrop");
  if (lpBackdrop) lpBackdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !launchPop.hidden) close(); });
}

/* ---- Gift deep link (legacy #gift → gifts page) ----------------------- */
// The gift chooser is now a standalone page. Keep old shared #gift links
// working by forwarding them to gifts.html.
if ((location.hash || "").toLowerCase() === "#gift") location.replace("gifts.html");

/* ---- Scroll reveal ---------------------------------------------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
