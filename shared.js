/* ════════════════════════════════════════════
   NoirFleet — Shared Chrome + Interactions
   One source of truth for header, footer & JS.
   Each page sets <body data-page="..."> so the
   correct nav item is highlighted.
════════════════════════════════════════════ */
(function () {

  /* ---- NAV MODEL (edit links/labels in ONE place) ---- */
  var NAV = [
    { id: 'home',     label: 'Home',     href: 'index.html'    },
    { id: 'fleet',    label: 'Fleet',    href: 'fleet.html'    },
    { id: 'global',   label: 'Global',   href: 'global.html'   },
    { id: 'events',   label: 'Events',   href: 'events.html'   },
    { id: 'partners', label: 'Partners', href: 'partners.html' },
    { id: 'services', label: 'Services', href: 'services.html' },
    { id: 'reviews',  label: 'Reviews',  href: 'reviews.html'  },
    { id: 'blog',     label: 'Journal',  href: 'blog.html'     },
    { id: 'contact',  label: 'Contact',  href: 'contact.html'  }
  ];

  var WHATSAPP = 'https://wa.me/917203070345';
  var PHONE    = '+91-7203070345';
  var EMAIL    = 'reservations@noirfleet.com';

  var current = document.body.getAttribute('data-page') || 'home';

  /* ---- helper: build nav links ---- */
  function navLinks(cls) {
    return NAV.map(function (n) {
      var active = n.id === current ? ' class="active"' : (cls ? ' class="' + cls + '"' : '');
      // merge active + extra class cleanly
      var classList = [];
      if (cls) classList.push(cls);
      if (n.id === current) classList.push('active');
      var attr = classList.length ? ' class="' + classList.join(' ') + '"' : '';
      return '<a href="' + n.href + '"' + attr + '>' + n.label + '</a>';
    }).join('');
  }

  /* ════════ CURSOR SPOTLIGHT ELEMENT ════════ */
  var spot = document.createElement('div');
  spot.className = 'cursor-spotlight';
  spot.id = 'cursorSpotlight';
  document.body.insertBefore(spot, document.body.firstChild);

  /* ════════ HEADER ════════ */
  var headerHTML =
    '<header class="site-header" id="siteHeader">' +
      '<div class="header-inner">' +
        '<div class="brand">' +
          '<a href="index.html" class="brand-link" aria-label="NoirFleet — Home">' +
            '<img src="logo.jpg" alt="NoirFleet Logo" class="logo" />' +
          '</a>' +
        '</div>' +
        '<nav class="main-nav" id="mainNav">' + navLinks() + '</nav>' +
        '<div class="header-cta">' +
          '<div class="contact-box">' +
            '<a href="' + WHATSAPP + '" class="contact-item">📞 ' + PHONE + '</a>' +
            '<span class="divider">|</span>' +
            '<a href="mailto:' + EMAIL + '" class="contact-item">✉ ' + EMAIL + '</a>' +
          '</div>' +
          '<button id="menuToggle" class="hamburger" aria-label="Open menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div id="mobileNav" class="mobile-nav" aria-hidden="true">' +
        navLinks() +
        '<div class="mnav-contact">' +
          '<a href="' + WHATSAPP + '">📞 ' + PHONE + '</a>' +
          '<a href="mailto:' + EMAIL + '">✉ ' + EMAIL + '</a>' +
        '</div>' +
      '</div>' +
    '</header>';

  var headerMount = document.getElementById('site-header');
  if (headerMount) headerMount.outerHTML = headerHTML;

  /* ════════ FOOTER ════════ */
  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<strong class="footer-name">NoirFleet</strong>' +
          '<p class="muted">Premium Ground Transport — Worldwide</p>' +
          '<div class="footer-links-inline">' +
            '<a href="' + WHATSAPP + '">WhatsApp</a>' +
            '<a href="mailto:' + EMAIL + '">Email Us</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-nav-cols">' +
          '<div class="fn-col">' +
            '<strong>Navigate</strong>' +
            '<a href="index.html">Home</a>' +
            '<a href="fleet.html">Our Fleet</a>' +
            '<a href="global.html">Global Presence</a>' +
            '<a href="events.html">Events 2026</a>' +
            '<a href="partners.html">Partners</a>' +
            '<a href="services.html">Services</a>' +
            '<a href="reviews.html">Reviews</a>' +
            '<a href="blog.html">Travel Journal</a>' +
            '<a href="contact.html">Contact</a>' +
          '</div>' +
          '<div class="fn-col">' +
            '<strong>Services</strong>' +
            '<a href="contact.html">Airport Transfers</a>' +
            '<a href="contact.html">Corporate Travel</a>' +
            '<a href="contact.html">Weddings &amp; Events</a>' +
            '<a href="contact.html">Hourly Hire</a>' +
            '<a href="contact.html">VIP &amp; Diplomatic</a>' +
            '<a href="contact.html">Intercity Transfers</a>' +
          '</div>' +
          '<div class="fn-col">' +
            '<strong>Contact</strong>' +
            '<a href="' + WHATSAPP + '">' + PHONE + '</a>' +
            '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
            '<span class="muted">Available 24/7</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<p>© <span id="curYear"></span> NoirFleet. All rights reserved.</p>' +
        '<p class="muted">Serving the world\'s most prestigious events since 2018</p>' +
      '</div>' +
    '</footer>';

  var footerMount = document.getElementById('site-footer');
  if (footerMount) footerMount.outerHTML = footerHTML;

  /* ════════ SCROLL-TO-TOP BUTTON ════════ */
  var stBtn = document.createElement('button');
  stBtn.className = 'scroll-top';
  stBtn.id = 'scrollTop';
  stBtn.setAttribute('aria-label', 'Back to top');
  stBtn.textContent = '↑';
  document.body.appendChild(stBtn);

  /* ════════ INTERACTIONS ════════ */

  /* Cursor spotlight */
  (function () {
    var s = document.getElementById('cursorSpotlight');
    if (!s) return;
    var tX = window.innerWidth / 2, tY = window.innerHeight / 2;
    var cX = tX, cY = tY, half = 300;
    document.addEventListener('mousemove', function (e) { tX = e.clientX; tY = e.clientY; s.style.opacity = '1'; });
    document.addEventListener('mouseleave', function () { s.style.opacity = '0'; });
    (function loop() {
      cX += (tX - cX) * 0.1; cY += (tY - cY) * 0.1;
      s.style.left = (cX - half) + 'px'; s.style.top = (cY - half) + 'px';
      requestAnimationFrame(loop);
    })();
  })();

  /* Mobile nav */
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var exp = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!exp));
      mobileNav.setAttribute('aria-hidden', String(exp));
      mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('is-active');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  /* Header shrink on scroll */
  var siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (siteHeader) siteHeader.classList.toggle('scrolled', window.scrollY > 60);
    if (stBtn) stBtn.classList.toggle('visible', window.scrollY > 400);
  });
  stBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* Footer year */
  var yr = document.getElementById('curYear');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Multi-timezone clocks (home page) */
  function fmtTime(tz) {
    return new Date().toLocaleTimeString('en-GB', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  }
  function tickClocks() {
    var map = {
      't-dubai': 'Asia/Dubai', 't-london': 'Europe/London',
      't-nyc': 'America/New_York', 't-mumbai': 'Asia/Kolkata'
    };
    for (var id in map) {
      var el = document.getElementById(id);
      if (el) el.textContent = fmtTime(map[id]);
    }
  }
  if (document.getElementById('t-dubai')) { tickClocks(); setInterval(tickClocks, 1000); }

  /* Event flip cards */
  document.querySelectorAll('.event-card').forEach(function (card) {
    function flip(e) { if (e.target.closest('.event-book-btn')) return; card.classList.toggle('flipped'); }
    card.addEventListener('click', flip);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
      if (e.key === 'Escape') card.classList.remove('flipped');
    });
  });

  /* Review flip cards */
  document.querySelectorAll('.review-card').forEach(function (card) {
    card.addEventListener('click', function () { card.classList.toggle('rc-flipped'); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('rc-flipped'); }
      if (e.key === 'Escape') card.classList.remove('rc-flipped');
    });
  });

  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.event-card,.global-card,.service-card,.why-card,.pricing-card,.clock-card,.ff-item,.review-card,.partner-card,.explore-card,.article-card').forEach(function (el) {
      el.classList.add('reveal-el'); obs.observe(el);
    });
  }

  /* Carousel factory */
  function initCarousel(opts) {
    var track = document.getElementById(opts.trackId); if (!track) return;
    var prev = document.getElementById(opts.prevId), next = document.getElementById(opts.nextId);
    var dots = document.getElementById(opts.dotsId), wrap = document.getElementById(opts.carouselId);
    var slides = Array.prototype.slice.call(track.querySelectorAll('.carousel-slide')), n = slides.length;
    if (!n) return;
    var cur = 0, AT = 4500, RD = 3000, atimer = null, rtimer = null, paused = false, drag = false, sx = 0, md = false;

    if (dots) {
      dots.innerHTML = '';
      slides.forEach(function (_, i) {
        var d = document.createElement('button');
        d.className = 'dot'; d.type = 'button';
        d.addEventListener('click', function () { go(i); pt(); });
        dots.appendChild(d);
      });
    }
    var dArr = dots ? Array.prototype.slice.call(dots.children) : [];
    function ud() { dArr.forEach(function (d) { d.classList.remove('active'); }); if (dArr[cur]) dArr[cur].classList.add('active'); }
    function vw() { return track.parentElement ? track.parentElement.clientWidth : track.clientWidth; }
    function sp(i, a) {
      var idx = ((i % n) + n) % n;
      track.style.transition = a ? 'transform .5s cubic-bezier(.2,.9,.2,1)' : 'none';
      track.style.transform = 'translateX(' + (-idx * vw()) + 'px)';
      cur = idx; ud();
    }
    function go(i) { sp(i, true); }
    function gx(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
    function pt() { paused = true; if (rtimer) clearTimeout(rtimer); rtimer = setTimeout(function () { paused = false; }, RD); }

    if (prev) prev.addEventListener('click', function () { go(cur - 1); pt(); });
    if (next) next.addEventListener('click', function () { go(cur + 1); pt(); });
    track.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { go(cur - 1); pt(); } if (e.key === 'ArrowRight') { go(cur + 1); pt(); } });
    track.addEventListener('touchstart', function (e) { drag = true; sx = gx(e); track.style.transition = 'none'; pt(); }, { passive: true });
    track.addEventListener('touchmove', function (e) { if (!drag) return; track.style.transform = 'translateX(' + (-(cur * vw()) + (gx(e) - sx)) + 'px)'; }, { passive: true });
    track.addEventListener('touchend', function (e) { if (!drag) return; drag = false; var dx = ((e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : sx) - sx; var th = vw() * 0.16; dx > th ? go(cur - 1) : dx < -th ? go(cur + 1) : go(cur); });
    track.addEventListener('mousedown', function (e) { md = true; drag = true; sx = gx(e); track.style.transition = 'none'; pt(); if (e.target.tagName === 'IMG') e.preventDefault(); });
    window.addEventListener('mousemove', function (e) { if (!md) return; track.style.transform = 'translateX(' + (-(cur * vw()) + (gx(e) - sx)) + 'px)'; });
    window.addEventListener('mouseup', function (e) { if (!md) return; md = false; drag = false; var dx = gx(e) - sx, th = vw() * 0.16; dx > th ? go(cur - 1) : dx < -th ? go(cur + 1) : go(cur); });

    function sa() { ca(); atimer = setInterval(function () { if (!paused && !drag) go(cur + 1); }, AT); }
    function ca() { if (atimer) { clearInterval(atimer); atimer = null; } }
    if (wrap) { wrap.addEventListener('mouseenter', function () { paused = true; }); wrap.addEventListener('mouseleave', function () { paused = false; }); }
    window.addEventListener('resize', function () { sp(cur, false); });
    sp(0, false); sa();
  }

  initCarousel({ carouselId: 'fleetCarousel', trackId: 'carouselTrack', prevId: 'prevFleet', nextId: 'nextFleet', dotsId: 'carouselDots' });
  initCarousel({ carouselId: 'servicesCarousel', trackId: 'servicesTrack', prevId: 'prevServices', nextId: 'nextServices', dotsId: 'servicesDots' });

})();
