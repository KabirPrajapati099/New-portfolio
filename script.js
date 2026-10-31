/* Kabir Prajapati — sideways portfolio interactions */
document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const h = $("#h");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* clock + year */
  const clock = $("#clock");
  const tick = () => { clock.textContent = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()); };
  tick(); setInterval(tick, 1000);
  $("#year").textContent = new Date().getFullYear();

  /* split headlines into letters */
  $$("[data-split]").forEach((el, k) => {
    let i = 0;
    $$(".ln", el).forEach((ln) => {
      const t = ln.textContent; ln.setAttribute("aria-label", t); ln.textContent = "";
      [...t].forEach((c) => {
        const s = document.createElement("span");
        s.className = "ch"; s.setAttribute("aria-hidden", "true");
        s.style.setProperty("--i", i++); s.textContent = c === " " ? "\u00A0" : c;
        ln.appendChild(s);
      });
    });
    if (el.closest(".hero")) el.style.setProperty("--d", "700ms");
  });

  /* loader */
  const count = $("#l-count"), bar = $("#l-bar"), loader = $("#loader");
  let n = 0;
  const run = setInterval(() => {
    n = Math.min(100, n + (reduce ? 100 : Math.ceil(Math.random() * 9)));
    count.textContent = n; bar.style.width = n + "%";
    if (n >= 100) {
      clearInterval(run);
      setTimeout(() => { loader.classList.add("done"); document.body.classList.add("ready"); }, 250);
      setTimeout(() => loader.remove(), 1400);
    }
  }, 45);

  /* reveal on enter (observed inside the sideways scroller) */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { root: h, threshold: 0.2 });
  $$("[data-r], [data-split]").forEach((el, i) => {
    if (el.hasAttribute("data-r")) el.style.transitionDelay = (i % 4) * 90 + "ms";
    if (!el.closest(".hero") || el.hasAttribute("data-r")) io.observe(el);
  });
  setTimeout(() => $$(".hero [data-r]").forEach((el) => el.classList.add("in")), 1500);

  /* sideways scrolling: wheel and keys drive an eased scrollLeft; touch stays native */
  const max = () => h.scrollWidth - h.clientWidth;
  let target = 0, cur = 0, driven = false;
  const panels = $$(".panel");
  const goTo = (i) => { target = clamp(panels[i].offsetLeft, 0, max()); };
  h.addEventListener("wheel", (e) => {
    if (e.ctrlKey) return;
    const vertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
    const p = e.target.closest(".panel");
    if (vertical && p && p.scrollHeight > p.clientHeight + 2) {
      const atEdge = (e.deltaY > 0 && p.scrollTop + p.clientHeight >= p.scrollHeight - 1) || (e.deltaY < 0 && p.scrollTop <= 0);
      if (!atEdge) return;
    }
    e.preventDefault();
    if (!driven) { target = cur = h.scrollLeft; driven = true; }
    target = clamp(target + (vertical ? e.deltaY : e.deltaX), 0, max());
  }, { passive: false });
  h.addEventListener("scroll", () => { if (!driven || Math.abs(h.scrollLeft - cur) > 3) { cur = target = h.scrollLeft; } });
  addEventListener("keydown", (e) => {
    if ($("#dlg").open) return;
    const k = { ArrowRight: 1, ArrowDown: 1, PageDown: 1, ArrowLeft: -1, ArrowUp: -1, PageUp: -1 }[e.key];
    if (!k) return;
    e.preventDefault(); driven = true; cur = h.scrollLeft;
    target = clamp(target + k * innerWidth * 0.6, 0, max());
  });
  $$("[data-go]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault(); driven = true; cur = h.scrollLeft; goTo(+a.dataset.go);
  }));

  /* mouse drag to pan */
  if (fine) {
    let down = false, sx = 0, sl = 0, moved = 0;
    h.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || e.target.closest("a,button")) return; down = true; sx = e.clientX; sl = h.scrollLeft; moved = 0; });
    addEventListener("pointermove", (e) => { if (!down) return; moved = e.clientX - sx; driven = true; target = cur = clamp(sl - moved, 0, max()); h.scrollLeft = cur; });
    addEventListener("pointerup", () => { down = false; });
  }

  /* per-frame: ease, parallax, 3D card tilt, progress */
  const bg = $("#bgword"), fill = $("#p-fill"), label = $("#p-label"), hint = $("#hint");
  const names = ["Home", "Work", "About", "Toolkit", "Contact"];
  const navs = $$(".top nav a");
  const cards = $$("[data-t]");
  let last = -1;
  (function frame() {
    if (driven && cur !== target) {
      cur += (target - cur) * (reduce ? 1 : 0.085);
      if (Math.abs(target - cur) < 0.4) cur = target;
      h.scrollLeft = cur;
    }
    const x = h.scrollLeft;
    bg.style.transform = `translate3d(${-x * 0.35}px,-50%,0)`;
    if (!reduce) {
      cards.forEach((w) => {
        const r = w.getBoundingClientRect();
        const d = clamp((r.left + r.width / 2 - innerWidth / 2) / (innerWidth / 2), -1.4, 1.4);
        const c = w.firstElementChild;
        c.style.setProperty("--t", d.toFixed(3));
        c.style.setProperty("--s", (1 - Math.min(Math.abs(d), 1) * 0.08).toFixed(3));
      });
    }
    const p = max() ? x / max() : 0;
    fill.style.transform = `scaleX(${p})`;
    let idx = 0;
    panels.forEach((pn, i) => { if (x + innerWidth * 0.45 >= pn.offsetLeft) idx = i; });
    if (idx !== last) {
      last = idx;
      label.textContent = `0${idx + 1} / 0${panels.length} ${names[idx]}`;
      navs.forEach((a) => a.classList.toggle("on", +a.dataset.go === idx));
    }
    if (x > 60) hint.style.opacity = 0;
    requestAnimationFrame(frame);
  })();

  /* cursor ring, magnetic buttons, portrait tilt */
  if (fine && !reduce) {
    const ring = $("#ring"); let rx = 0, ry = 0, tx = 0, ty = 0;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; ring.classList.add("on"); }, { passive: true });
    (function follow() { rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(follow); })();
    $$("a,button").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("big"));
      el.addEventListener("mouseleave", () => ring.classList.remove("big"));
    });
    $$("[data-mag]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
    const pt = $("#portrait");
    addEventListener("mousemove", (e) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      pt.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
    }, { passive: true });
  }

  /* project dialog */
  const P = {
    myplay: ["Entertainment", "My Play", "", "An Indian OTT platform concept celebrating regional entertainment, languages and cultural storytelling.", "My Play explores how a regional entertainment platform can bring diverse Indian stories closer to viewers, with accessible content discovery, familiar navigation and a visual identity rooted in Indian culture. It covers Hindi, Malvi, Rajasthani and Marathi content.", ["OTT platform", "UI/UX design", "Mobile app", "Content discovery", "Prototyping"], "resources/MYPLAY Case-study.pdf"],
    tuvgo: ["Mobility", "TÜV Go", "x", "A mobile app design focused on a clear, approachable vehicle service experience.", "TÜV Go explores how people use vehicle services through a structured mobile experience: simpler navigation, clearly presented vehicle information, and inspection and maintenance journeys that are easy to follow.", ["Mobile app", "UI design", "UX design", "User flows", "Prototyping"], ""],
    loanease: ["Fintech", "Loan Ease — NBFC", "x", "A guided NBFC loan application that makes document submission, verification and tracking easy to follow.", "Loan Ease focuses on a guided borrower journey, not an instant-loan experience. It breaks the process into clear steps, from personal information and uploads to verification and updates, and explores AI-assisted document verification.", ["Fintech", "NBFC", "Mobile app", "Design systems", "Dashboard"], ""],
    seo: ["SEO writing", "Local SEO Playbook", "", "A practical content guide to local search visibility and on-page optimisation for service businesses.", "The playbook shows how service businesses can organise their online information and make website content more relevant, covering local search, page structure, search intent and the details customers look for.", ["Local SEO", "On-page SEO", "Content strategy", "Keyword research"], ""],
    content: ["Content architecture", "Content Structure That Ranks", "", "An exploration of heading hierarchy, search intent and internal linking for reader-friendly SEO content.", "This project looks at how planned content structure makes information easier to understand: heading hierarchy, logical topic organisation, search intent and internal linking that serve readers and search engines.", ["SEO writing", "Search intent", "Internal linking", "Content planning"], ""]
  };
  const dlg = $("#dlg"); let opener = null;
  $$("[data-p]").forEach((b) => b.addEventListener("click", () => {
    const d = P[b.dataset.p]; opener = b;
    $("#d-cat").textContent = d[0]; $("#d-title").textContent = d[1];
    $("#d-status").hidden = !d[2]; $("#d-desc").textContent = d[3]; $("#d-ov").textContent = d[4];
    $("#d-tags").replaceChildren(...d[5].map((t) => Object.assign(document.createElement("span"), { textContent: t })));
    const c = $("#d-case"); c.hidden = !d[6]; if (d[6]) c.href = d[6];
    dlg.showModal();
  }));
  $("#x").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => opener && opener.focus());
});
