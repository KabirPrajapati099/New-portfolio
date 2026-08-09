/* ============================================================
   KABIR PRAJAPATI — PORTFOLIO SCRIPT
   Sections: data, render, cursor, reveals, nav, filter, modal, form
   ============================================================ */
(function(){
  "use strict";

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. PROJECT DATA
  --------------------------------------------------------- */
  const PROJECTS = [
    {
      id: "tuv-care",
      type: "uiux",
      tag: "UI/UX Design",
      mockupClass: "mockup-tuv",
      mockupExtra: `<span class="m-bar"></span><span class="m-ring"></span><span class="m-card"></span>`,
      title: "TÜV Care — Vehicle Inspection App",
      blurb: "A dual-mode design system for a vehicle inspection platform, built from a 44-prompt Stitch AI library.",
      tools: ["Figma", "Stitch AI", "Design Tokens", "Prototyping"],
      year: "2025",
      role: "UI/UX Designer · Orbosis Global (Intern)",
      platform: "Android / iOS",
      screens: "44 Stitch AI prompts",
      heroGradient: "linear-gradient(135deg,#2F6D4F,#183B29)",
      overview: "TÜV Care needed one consistent interface to serve two very different people at once: the inspector logging a vehicle's condition in the field, and the owner checking on its status from home. The brief was to design a single system flexible enough to hold both.",
      problem: "The existing flow mixed inspector and owner tasks on the same screens, so neither group got an interface tuned to what they actually needed to do — inspectors wanted speed and structure, owners wanted clarity and reassurance.",
      approach: "I split the product into two clearly themed modes sharing one underlying design system, then documented the entire screen set as a library of 44 reusable Stitch AI prompts — covering components, states, and layout rules — so new screens stay consistent without redesigning from scratch each time.",
      highlights: [
        "Dual-mode system: Inspector workflow and Owner dashboard",
        "44 documented Stitch AI prompts for consistent generation",
        "Full token set: type scale, spacing, elevation, states",
        "Componentized checklist and status-report patterns"
      ],
      outcome: "A scalable, documented system ready for engineering handoff — new screens can be produced from the prompt library without drifting from the system."
    },
    {
      id: "mi-thunee",
      type: "uiux",
      tag: "UI/UX Design",
      mockupClass: "mockup-thunee",
      mockupExtra: `<span class="m-glow"></span><span class="m-card"></span><span class="m-card2"></span><span class="m-hud">12&nbsp;BALL</span>`,
      title: "Mi Thunee — Card Game UI",
      blurb: "A 2v2 real-time card game reimagined as a Modern Neon Arcade — full HUD, splash animation, and a living style guide.",
      tools: ["Figma", "Motion Design", "HTML Style Guide", "Game UI"],
      year: "2025",
      role: "UI/UX Designer",
      platform: "Mobile · Real-time multiplayer",
      screens: "Splash, Home HUD, Style guide",
      heroGradient: "linear-gradient(150deg,#1B1030,#3B1F6B)",
      overview: "Mi Thunee is a 2v2 real-time online card game with Practice and 12 Ball modes and a dual-currency economy of Coins and Diamonds. It needed a visual identity strong enough to feel like a destination, not a generic card-game template.",
      problem: "The game's early screens had no unifying direction — colour, type and iconography varied screen to screen, which undercut the competitive, high-energy feel the format deserved.",
      approach: "I set a 'Modern Neon Arcade / Fantasy Card Game' direction — Russo One for display type paired with Manrope for UI text, deep purple backgrounds with a neon accent palette — then built a living HTML style guide so the direction could be checked against real code, not just static frames. The Home Dashboard was rebuilt as a game HUD, and I animated the splash screen as the first frame players see.",
      highlights: [
        "Animated splash screen as the app's first impression",
        "Home Dashboard rebuilt as a game HUD",
        "Dual-currency economy UI: Coins &amp; Diamonds",
        "Living HTML style guide, not a static reference"
      ],
      outcome: "A cohesive design foundation the remaining screens are now being repainted against, with the splash and HUD shipped as reference implementations."
    },
    {
      id: "arihant-matrimony",
      type: "uiux",
      tag: "UI/UX Design",
      mockupClass: "mockup-arihant",
      mockupExtra: `<div class="m-bento"><div></div><div></div><div></div></div>`,
      title: "Arihant Matrimony — Platform UX",
      blurb: "Mid-fidelity UX for a multi-tenant matrimony platform — 18+ screen prompts and a bento-grid browsing system.",
      tools: ["Figma", "Stitch AI", "Bento Layouts", "UX Research"],
      year: "2024",
      role: "UI/UX Designer",
      platform: "Web · Multi-tenant",
      screens: "18+ mid-fi screens",
      heroGradient: "linear-gradient(135deg,#C1121F,#7A0C15)",
      overview: "Arihant Matrimony operates as a multi-tenant platform, serving several communities under one product with different branding needs per tenant. The challenge was building a layout system flexible enough for that variation without feeling inconsistent.",
      problem: "Profile browsing needed to surface a lot of varied information — photos, compatibility details, family background — without turning into a wall of identical list rows that's tedious to scan.",
      approach: "I structured the browse and profile views around a bento-grid layout, letting the most important information take more visual weight while secondary details stay compact, and produced 18+ mid-fidelity Stitch AI prompts covering the platform's core flows so tenant theming could be layered on top of a consistent structure.",
      highlights: [
        "Bento-grid browsing system for scannable profiles",
        "18+ documented mid-fi Stitch AI screen prompts",
        "Multi-tenant theming layer over one shared structure",
        "Profile, browse, and match-detail flows mapped end to end"
      ],
      outcome: "A scalable mid-fi screen set that moved cleanly into visual design, with the bento structure holding up across every tenant's branding."
    },
    {
      id: "seo-local-playbook",
      type: "seo",
      tag: "SEO Content Writing",
      mockupClass: "mockup-seo1",
      mockupExtra: `<div class="m-lines"><span></span><span></span><span></span><span></span></div>`,
      title: "Local SEO Playbook for Service Businesses",
      blurb: "An on-page and local-SEO content guide written to rank service businesses in map-pack and organic results.",
      tools: ["Keyword Research", "On-page SEO", "Content Structure", "Editing"],
      year: "2025",
      role: "SEO Content Writer · Orbosis Global (Intern)",
      keyword: "local SEO checklist",
      wordCount: "≈1,800 words",
      readTime: "7 min read",
      heroGradient: "linear-gradient(135deg,#C1121F,#8F151D)",
      overview: "A local service business searched for by neighbourhood — plumbers, clinics, salons — competes for map-pack placement as much as organic ranking. This piece was written as a practical, checklist-style guide to both.",
      problem: "Most local-SEO content online is either too generic to act on or too technical for a business owner managing their own listing. The gap was a guide that's specific enough to implement in an afternoon.",
      approach: "I researched the target keyword's actual search intent, then structured the article around the decisions a business owner has to make in order — Google Business Profile setup, review strategy, on-page location signals, citation consistency — with a scannable heading hierarchy built for featured-snippet eligibility.",
      highlights: [
        "Search-intent research before a single word was written",
        "Heading structure built for featured-snippet eligibility",
        "Actionable checklist format, not just theory",
        "Internal linking plan mapped alongside the draft"
      ],
      outcome: "A structured, publish-ready guide targeting a competitive local-intent keyword, written to be genuinely usable rather than padded for length.",
      excerpt: "Most local SEO advice tells you what to do. It rarely tells you what order to do it in — and order is what actually moves a map-pack ranking. Start with the listing, not the website: an accurate, fully completed Google Business Profile is doing more work for a service business than another blog post ever will."
    },
    {
      id: "seo-onpage-structure",
      type: "seo",
      tag: "SEO Content Writing",
      mockupClass: "mockup-seo2",
      mockupExtra: `<div class="m-graph"><span style="height:30%"></span><span style="height:55%"></span><span style="height:40%"></span><span style="height:75%"></span><span style="height:50%"></span><span style="height:90%"></span></div>`,
      title: "Content Structure That Ranks",
      blurb: "A structural breakdown of headings, intent-matching, and internal linking for content that satisfies readers and search engines together.",
      tools: ["Content Strategy", "On-page SEO", "Information Architecture", "Editing"],
      year: "2025",
      role: "SEO Content Writer · Orbosis Global (Intern)",
      keyword: "on-page SEO structure",
      wordCount: "≈2,200 words",
      readTime: "9 min read",
      heroGradient: "linear-gradient(135deg,#34633F,#1F3D27)",
      overview: "Written as a practical companion piece to keyword research content: once you know what to write about, this article covers how to structure it so both readers and search engines can follow it.",
      problem: "A lot of on-page SEO writing focuses on keyword placement and stops there, leaving structure — the part that actually affects dwell time and crawl clarity — as an afterthought.",
      approach: "I broke the article into a repeatable structural framework: intent-matching in the first 100 words, a heading hierarchy that mirrors how the topic is actually searched, and an internal linking pattern that connects to supporting content instead of sitting as an isolated page.",
      highlights: [
        "Repeatable heading framework tied to search intent",
        "Internal linking pattern mapped into the outline",
        "Written for both dwell time and crawl clarity",
        "Paired with a companion keyword-research piece"
      ],
      outcome: "A framework-style article that doubles as a reusable structure for future content briefs, not a one-off post.",
      excerpt: "Search engines don't reward good writing. They reward writing that's structured so a machine and a skimming human arrive at the same understanding, thirty seconds apart. That means the heading a person scans past is doing exactly the same job as the heading a crawler indexes."
    }
  ];

  /* ---------------------------------------------------------
     2. RENDER PROJECT GRID
  --------------------------------------------------------- */
  const grid = document.getElementById('projectGrid');

  function cardTemplate(p, i){
    const metaBit = p.type === 'seo' ? p.readTime : p.platform;
    return `
    <article class="project-card" data-type="${p.type}" data-id="${p.id}" data-index="${i}" tabindex="0" role="button" aria-label="Open case study: ${p.title}">
      <span class="card-pin" aria-hidden="true"></span>
      <span class="card-tag">${p.tag}</span>
      <div class="card-visual ${p.mockupClass}">${p.mockupExtra}</div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-blurb">${p.blurb}</p>
      <div class="card-tools">${p.tools.slice(0,3).map(t=>`<span>${t}</span>`).join('')}</div>
      <div class="card-foot">
        <span class="card-cta">View case study
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="card-year">${metaBit}</span>
      </div>
    </article>`;
  }

  grid.innerHTML = PROJECTS.map(cardTemplate).join('');

  /* ---------------------------------------------------------
     3. CUSTOM CURSOR
  --------------------------------------------------------- */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  if (canHover && !prefersReducedMotion){
    let mx=0,my=0, rx=0, ry=0;
    document.addEventListener('mousemove', (e)=>{
      mx=e.clientX; my=e.clientY;
      dot.style.left = mx+'px'; dot.style.top = my+'px';
      document.body.classList.add('cursor-active');
    });
    function loop(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      ring.style.left = rx+'px'; ring.style.top = ry+'px';
      requestAnimationFrame(loop);
    }
    loop();
    document.addEventListener('mouseleave', ()=> document.body.classList.remove('cursor-active'));
    const hoverTargets = 'a, button, .project-card, input, textarea, select, [data-nav]';
    document.addEventListener('mouseover', (e)=>{
      if(e.target.closest(hoverTargets)) ring.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e)=>{
      if(e.target.closest(hoverTargets)) ring.classList.remove('is-hover');
    });
  }

  /* ---------------------------------------------------------
     4. PRELOADER
  --------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const hero = document.getElementById('hero');
  function finishLoad(){
    preloader.classList.add('is-done');
    hero.classList.add('is-loaded');
    document.querySelectorAll('.hero [data-reveal]').forEach(el=>el.classList.add('is-visible'));
  }
  if (prefersReducedMotion){
    finishLoad();
  } else {
    window.addEventListener('load', ()=> setTimeout(finishLoad, 650));
    setTimeout(finishLoad, 2200); // safety fallback
  }

  /* ---------------------------------------------------------
     5. SCROLL REVEALS
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal], .project-card');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach((entry, idx)=>{
        if(entry.isIntersecting){
          const el = entry.target;
          const delay = el.classList.contains('project-card') ? (el.dataset.index % 3) * 90 : 0;
          setTimeout(()=> el.classList.add('is-visible'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold:0.14, rootMargin:'0px 0px -60px 0px' });
    revealEls.forEach(el=> io.observe(el));
  } else {
    revealEls.forEach(el=> el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------
     6. NAV: scroll show/hide + smooth scroll + mobile sheet
  --------------------------------------------------------- */
  const siteNav = document.getElementById('siteNav');
  let lastY = window.scrollY;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    siteNav.classList.toggle('nav-scrolled', y > 20);
    if (y > lastY && y > 140){ siteNav.classList.add('nav-hidden'); }
    else { siteNav.classList.remove('nav-hidden'); }
    lastY = y;

    const backBtn = document.getElementById('backToTop');
    backBtn.style.opacity = y > 700 ? '1' : '0';
    backBtn.style.pointerEvents = y > 700 ? 'auto' : 'none';
  }, { passive:true });

  document.getElementById('backToTop').style.opacity = '0';

  document.querySelectorAll('[data-nav]').forEach(link=>{
    link.addEventListener('click', (e)=>{
      const href = link.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        closeMobileMenu();
        const target = document.querySelector(href);
        if(target){
          const y = target.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 700 ? 70 : 90);
          window.scrollTo({ top:y, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      }
    });
  });

  const navToggle = document.getElementById('navToggle');
  const mobileSheet = document.getElementById('mobileSheet');
  function openMobileMenu(){
    mobileSheet.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded','true');
    document.body.classList.add('modal-open');
  }
  function closeMobileMenu(){
    mobileSheet.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded','false');
    if(!modalOverlay.classList.contains('is-open')) document.body.classList.remove('modal-open');
  }
  navToggle.addEventListener('click', ()=>{
    mobileSheet.classList.contains('is-open') ? closeMobileMenu() : openMobileMenu();
  });

  document.getElementById('backToTop').addEventListener('click', ()=>{
    window.scrollTo({ top:0, behavior: prefersReducedMotion ? 'auto':'smooth' });
  });

  /* ---------------------------------------------------------
     7. FILTER TABS
  --------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>{ b.classList.remove('is-active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-selected','true');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card=>{
        const match = filter === 'all' || card.dataset.type === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------------------------------------------------------
     8. PROJECT MODAL
  --------------------------------------------------------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalIndex = document.getElementById('modalIndex');
  let currentProjectIdx = 0;

  function modalTemplate(p){
    if (p.type === 'seo'){
      return `
        <div class="modal-hero" style="background:${p.heroGradient}">
          <div class="modal-hero-inner">
            <span class="modal-tag">${p.tag}</span>
            <h2 class="modal-title" id="modalTitle">${p.title}</h2>
          </div>
        </div>
        <div class="modal-content">
          <div class="modal-meta-row">
            <div><span>Role</span><span>${p.role}</span></div>
            <div><span>Target keyword</span><span>${p.keyword}</span></div>
            <div><span>Length</span><span>${p.wordCount}</span></div>
            <div><span>Read time</span><span>${p.readTime}</span></div>
          </div>
          <div class="modal-section"><h4>Overview</h4><p>${p.overview}</p></div>
          <div class="modal-section"><h4>The gap</h4><p>${p.problem}</p></div>
          <div class="modal-section"><h4>Approach</h4><p>${p.approach}</p></div>
          <div class="modal-section">
            <h4>What it covers</h4>
            <ul class="modal-highlights">${p.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>
          </div>
          <div class="modal-section"><h4>Opening excerpt</h4><div class="modal-excerpt">${p.excerpt}</div></div>
          <div class="modal-section"><h4>Outcome</h4><p>${p.outcome}</p></div>
        </div>`;
    }
    return `
      <div class="modal-hero" style="background:${p.heroGradient}">
        <div class="modal-hero-inner">
          <span class="modal-tag">${p.tag}</span>
          <h2 class="modal-title" id="modalTitle">${p.title}</h2>
        </div>
      </div>
      <div class="modal-content">
        <div class="modal-meta-row">
          <div><span>Role</span><span>${p.role}</span></div>
          <div><span>Platform</span><span>${p.platform}</span></div>
          <div><span>Deliverable</span><span>${p.screens}</span></div>
          <div><span>Year</span><span>${p.year}</span></div>
        </div>
        <div class="modal-section"><h4>Overview</h4><p>${p.overview}</p></div>
        <div class="modal-section"><h4>The problem</h4><p>${p.problem}</p></div>
        <div class="modal-section"><h4>Approach</h4><p>${p.approach}</p></div>
        <div class="modal-section">
          <h4>Highlights</h4>
          <ul class="modal-highlights">${p.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>
        </div>
        <div class="modal-section"><h4>Outcome</h4><p>${p.outcome}</p></div>
        <div class="modal-section"><h4>Tools</h4><p>${p.tools.join(' · ')}</p></div>
      </div>`;
  }

  function openModal(idx){
    currentProjectIdx = (idx + PROJECTS.length) % PROJECTS.length;
    const p = PROJECTS[currentProjectIdx];
    modalBody.innerHTML = modalTemplate(p);
    modalIndex.textContent = String(currentProjectIdx+1).padStart(2,'0') + ' / ' + String(PROJECTS.length).padStart(2,'0');
    modalOverlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    modalBody.scrollTop = 0;
    document.getElementById('modalClose').focus({ preventScroll:true });
  }
  function closeModal(){
    modalOverlay.classList.remove('is-open');
    if(!mobileSheet.classList.contains('is-open')) document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('click', ()=> openModal(Number(card.dataset.index)));
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openModal(Number(card.dataset.index)); }
    });
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalPrev').addEventListener('click', ()=> openModal(currentProjectIdx - 1));
  document.getElementById('modalNext').addEventListener('click', ()=> openModal(currentProjectIdx + 1));
  modalOverlay.addEventListener('click', (e)=>{ if(e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e)=>{
    if(!modalOverlay.classList.contains('is-open')) return;
    if(e.key === 'Escape') closeModal();
    if(e.key === 'ArrowLeft') openModal(currentProjectIdx - 1);
    if(e.key === 'ArrowRight') openModal(currentProjectIdx + 1);
  });

  /* ---------------------------------------------------------
     9. CONTACT FORM VALIDATION
  --------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const CONTACT_EMAIL = document.getElementById('contactEmail').textContent.trim();

  const fields = {
    name:    { el: document.getElementById('fName'),    err: document.getElementById('err-name') },
    email:   { el: document.getElementById('fEmail'),   err: document.getElementById('err-email') },
    message: { el: document.getElementById('fMessage'), err: document.getElementById('err-message') }
  };

  const validators = {
    name: (v)=> v.trim().length >= 2 ? '' : 'Please enter your full name (min. 2 characters).',
    email: (v)=>{
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(v.trim()) ? '' : 'Enter a valid email address.';
    },
    message: (v)=> v.trim().length >= 10 ? '' : 'Say a little more — at least 10 characters.'
  };

  function validateField(key){
    const { el, err } = fields[key];
    const message = validators[key](el.value);
    const wrapper = el.closest('.field');
    if(message){
      wrapper.classList.add('has-error');
      wrapper.classList.remove('is-valid');
      err.textContent = message;
      return false;
    }
    wrapper.classList.remove('has-error');
    wrapper.classList.add('is-valid');
    err.textContent = '';
    return true;
  }

  Object.keys(fields).forEach(key=>{
    const { el } = fields[key];
    el.addEventListener('blur', ()=> validateField(key));
    el.addEventListener('input', ()=>{
      if(el.closest('.field').classList.contains('has-error')) validateField(key);
    });
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let allValid = true;
    Object.keys(fields).forEach(key=>{
      const valid = validateField(key);
      if(!valid){
        allValid = false;
        const wrapper = fields[key].el.closest('.field');
        wrapper.classList.remove('shake');
        void wrapper.offsetWidth; // restart animation
        wrapper.classList.add('shake');
      }
    });
    if(!allValid){
      const firstError = form.querySelector('.field.has-error input, .field.has-error textarea');
      if(firstError) firstError.focus();
      return;
    }

    const name = fields.name.el.value.trim();
    const email = fields.email.el.value.trim();
    const subject = document.getElementById('fSubject').value;
    const message = fields.message.el.value.trim();

    const mailSubject = encodeURIComponent(`${subject} — inquiry from ${name}`);
    const mailBody = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    submitBtn.classList.add('is-sent');
    submitBtn.disabled = true;
    window.location.href = mailtoLink;

    setTimeout(()=>{
      submitBtn.classList.remove('is-sent');
      submitBtn.disabled = false;
      form.reset();
      Object.keys(fields).forEach(key=>{
        fields[key].el.closest('.field').classList.remove('is-valid','has-error');
      });
    }, 2600);
  });

  /* ---------------------------------------------------------
     10. FOOTER YEAR
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

})();