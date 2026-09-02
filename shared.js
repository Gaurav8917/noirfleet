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
    { id: 'events',   label: 'Events',   href: 'events.html',
      children: [
        { id: 'sports-tourism', label: 'Sports Tourism', href: 'sports-tourism.html' }
      ]
    },
    { id: 'partners', label: 'Partners', href: 'partners.html' },
    { id: 'services', label: 'Services', href: 'services.html' },
    { id: 'reviews',  label: 'Reviews',  href: 'reviews.html'  },
    { id: 'blog',     label: 'Journal',  href: 'blog.html'     },
    { id: 'contact',  label: 'Contact',  href: 'contact.html'  }
  ];

  /* ---- CONTACT NUMBERS (USA primary, India secondary) ---- */
  var WHATSAPP_US = 'https://wa.me/13502381309';
  var PHONE_US    = '+1-350-238-1309';
  var WHATSAPP_IN = 'https://wa.me/917203070345';
  var PHONE_IN    = '+91-7203070345';
  var EMAIL       = 'reservations@noirfleet.com';

  var current = document.body.getAttribute('data-page') || 'home';

  /* ---- inject dropdown nav CSS (same pattern as splash/WhatsApp styles) ---- */
  (function () {
    var navStyle = document.createElement('style');
    navStyle.textContent = [
      '.nav-dropdown{position:relative;display:inline-block;}',
      '.nav-dropdown>a{display:inline-flex;align-items:center;gap:4px;}',
      '.nav-caret{font-size:9px;opacity:.55;transition:transform .2s ease;position:relative;top:1px;}',
      '.nav-dropdown:hover .nav-caret{transform:rotate(180deg);}',
      '.nav-dropdown-menu{position:absolute;top:100%;left:0;margin-top:14px;background:#0e0e10;border:1px solid rgba(255,209,102,.18);border-radius:8px;min-width:200px;padding:8px 0;opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .2s ease,transform .2s ease,visibility .2s ease;box-shadow:0 12px 32px rgba(0,0,0,.45);z-index:60;}',
      '.nav-dropdown-menu::before{content:"";position:absolute;top:-14px;left:0;right:0;height:14px;}',
      '.nav-dropdown:hover .nav-dropdown-menu{opacity:1;visibility:visible;transform:translateY(0);}',
      '.nav-dropdown-menu a{display:block;padding:9px 18px;font-size:13px;color:rgba(255,255,255,.72);text-decoration:none;white-space:nowrap;transition:color .15s ease,background .15s ease;}',
      '.nav-dropdown-menu a:hover{color:#ffd166;background:rgba(255,209,102,.06);}',
      '.nav-dropdown-menu a.active{color:#ffd166;}',
      '.mnav-sublink{display:block;padding-left:30px !important;font-size:13.5px !important;opacity:.7;}'
    ].join('');
    document.head.appendChild(navStyle);
  })();

  /* ---- helper: build nav links (isMobile controls dropdown vs indented list) ---- */
  function navLinks(cls, isMobile) {
    return NAV.map(function (n) {
      var classList = [];
      if (cls) classList.push(cls);
      if (n.id === current) classList.push('active');

      if (n.children && n.children.length) {
        var childActive = n.children.some(function (c) { return c.id === current; });
        var parentClasses = classList.slice();
        if (childActive) parentClasses.push('active');
        var parentAttr = parentClasses.length ? ' class="' + parentClasses.join(' ') + '"' : '';

        if (isMobile) {
          var subLinksHtml = n.children.map(function (c) {
            var subCls = 'mnav-sublink' + (c.id === current ? ' active' : '');
            return '<a href="' + c.href + '" class="' + subCls + '">' + c.label + '</a>';
          }).join('');
          return '<a href="' + n.href + '"' + parentAttr + '>' + n.label + '</a>' + subLinksHtml;
        }

        var menuLinksHtml = n.children.map(function (c) {
          var subAttr = c.id === current ? ' class="active"' : '';
          return '<a href="' + c.href + '"' + subAttr + '>' + c.label + '</a>';
        }).join('');
        return '<div class="nav-dropdown">' +
                 '<a href="' + n.href + '"' + parentAttr + '>' + n.label + ' <span class="nav-caret">&#9662;</span></a>' +
                 '<div class="nav-dropdown-menu">' + menuLinksHtml + '</div>' +
               '</div>';
      }

      var attr = classList.length ? ' class="' + classList.join(' ') + '"' : '';
      return '<a href="' + n.href + '"' + attr + '>' + n.label + '</a>';
    }).join('');
  }

  /* ════════════════════════════════════════════
     SPLASH SCREEN — shows once per session
     only on the homepage (data-page="home")
  ════════════════════════════════════════════ */
  (function () {
    if (current !== 'home') return;
    if (sessionStorage.getItem('nf-splash-shown')) return;
    sessionStorage.setItem('nf-splash-shown', '1');

    var greetings = [
      { word: 'Hello',       lang: 'English'    },
      { word: 'नमस्ते',      lang: 'Hindi'      },
      { word: 'Bonjour',     lang: 'French'     },
      { word: 'مرحبا',       lang: 'Arabic'     },
      { word: 'Hola',        lang: 'Spanish'    },
      { word: 'こんにちは',   lang: 'Japanese'   },
      { word: 'Ciao',        lang: 'Italian'    },
      { word: 'Olá',         lang: 'Portuguese' },
      { word: 'Привет',      lang: 'Russian'    },
      { word: 'வணக்கம்',    lang: 'Tamil'      },
      { word: 'Guten Tag',   lang: 'German'     },
      { word: '你好',         lang: 'Mandarin'   },
    ];

    var TOTAL = 5000;
    var PER   = Math.floor(TOTAL / greetings.length);

    var sStyle = document.createElement('style');
    sStyle.textContent = [
      '#nf-splash{position:fixed;inset:0;background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:99999;overflow:hidden;}',
      '#nf-splash-logo{font-family:"Playfair Display",Georgia,serif;font-size:13px;letter-spacing:.35em;text-transform:uppercase;color:rgba(255,209,102,.5);margin-bottom:48px;}',
      '#nf-splash-word{font-family:"Playfair Display",Georgia,serif;font-size:clamp(52px,10vw,96px);font-weight:400;color:#ffd166;letter-spacing:.05em;min-height:120px;display:flex;align-items:center;justify-content:center;opacity:0;transform:translateY(12px);transition:opacity .4s ease,transform .4s ease;}',
      '#nf-splash-word.nf-vis{opacity:1;transform:translateY(0);}',
      '#nf-splash-word.nf-out{opacity:0;transform:translateY(-12px);}',
      '#nf-splash-lang{font-family:Georgia,serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-top:20px;min-height:20px;transition:opacity .3s ease;opacity:0;}',
      '#nf-splash-dots{display:flex;gap:8px;margin-top:52px;}',
      '.nf-dot{width:5px;height:5px;border-radius:50%;background:rgba(255,209,102,.2);transition:background .3s ease;}',
      '.nf-dot.nf-a{background:#ffd166;}',
      '#nf-splash-bar{position:absolute;bottom:0;left:0;height:2px;background:#ffd166;width:0%;}',
      '#nf-splash.nf-exit{opacity:0;transition:opacity .6s ease;pointer-events:none;}'
    ].join('');
    document.head.appendChild(sStyle);

    var splash = document.createElement('div');
    splash.id = 'nf-splash';
    splash.innerHTML =
      '<div id="nf-splash-logo">NoirFleet</div>' +
      '<div id="nf-splash-word"></div>' +
      '<div id="nf-splash-lang"></div>' +
      '<div id="nf-splash-dots"></div>' +
      '<div id="nf-splash-bar"></div>';
    document.body.appendChild(splash);

    var dotsEl = document.getElementById('nf-splash-dots');
    greetings.forEach(function (_, i) {
      var d = document.createElement('div');
      d.className = 'nf-dot';
      d.id = 'nf-dot-' + i;
      dotsEl.appendChild(d);
    });

    var wordEl = document.getElementById('nf-splash-word');
    var langEl = document.getElementById('nf-splash-lang');
    var bar    = document.getElementById('nf-splash-bar');

    bar.style.transition = 'width ' + TOTAL + 'ms linear';
    setTimeout(function () { bar.style.width = '100%'; }, 60);

    var cur2 = 0;
    function showWord(i) {
      wordEl.classList.remove('nf-vis', 'nf-out');
      langEl.style.opacity = '0';
      setTimeout(function () {
        wordEl.textContent = greetings[i].word;
        wordEl.classList.add('nf-vis');
        langEl.textContent = greetings[i].lang;
        langEl.style.opacity = '1';
        document.querySelectorAll('.nf-dot').forEach(function (d, j) {
          d.classList.toggle('nf-a', j === i);
        });
      }, 100);
    }
    function nextWord() {
      if (cur2 >= greetings.length) { endSplash(); return; }
      showWord(cur2);
      cur2++;
      setTimeout(nextWord, PER);
    }
    function endSplash() {
      wordEl.classList.add('nf-out');
      setTimeout(function () {
        splash.classList.add('nf-exit');
        setTimeout(function () { splash.remove(); sStyle.remove(); }, 700);
      }, 400);
    }
    nextWord();
  })();

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
        '<nav class="main-nav" id="mainNav">' + navLinks(null, false) + '</nav>' +
        '<div class="header-cta">' +
          '<div class="contact-box">' +
'<a href="' + WHATSAPP_US + '" class="contact-item">📞 ' + PHONE_US + '</a>' +
'<span class="divider">|</span>' +
'<a href="mailto:' + EMAIL + '" class="contact-item">✉ ' + EMAIL + '</a>' +
          '</div>' +
          '<button id="menuToggle" class="hamburger" aria-label="Open menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div id="mobileNav" class="mobile-nav" aria-hidden="true">' +
        navLinks(null, true) +
        '<div class="mnav-contact">' +
          '<a href="' + WHATSAPP_US + '">📞 ' + PHONE_US + ' (Worldwide)</a>' +
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
'<p class="muted"><a href="tel:+917203070345" style="color:inherit;text-decoration:none;">+91-7203070345</a> &nbsp;·&nbsp; <a href="tel:+13502381309" style="color:inherit;text-decoration:none;">+1-350-238-1309</a></p>' +
'<p class="muted"><a href="mailto:' + EMAIL + '" style="color:inherit;text-decoration:none;">' + EMAIL + '</a></p>' +
          '<div class="footer-links-inline">' +
'<a href="luxury-chauffeur-service-india.html">Luxury Chauffeur</a>' +
'<a href="corporate-transportation-solutions-india.html">Corporate Travel</a>' +
'<a href="services.html">Airport Transfers</a>' +
'<a href="events.html">Event Transportation</a>' +
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
'<a href="luxury-chauffeur-service-india.html">Luxury Chauffeur</a>' +
'<a href="corporate-transportation-solutions-india.html">Corporate Travel</a>' +
'<a href="services.html">Airport Transfers</a>' +
'<a href="events.html">Event Transportation</a>' +
'<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
'<span class="muted">Connect with us 24/7 · 365 Days</span>' +
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
  });

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

  /* ════════ FLOATING WHATSAPP BUTTON ════════ */
  (function () {
    var waStyle = document.createElement('style');
    waStyle.textContent = [
      '#nf-wa{position:fixed;bottom:28px;right:28px;z-index:9998;display:flex;align-items:center;gap:10px;cursor:pointer;text-decoration:none;}',
      '#nf-wa-bubble{background:#25D366;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,211,102,.35);transition:transform .2s ease,box-shadow .2s ease;flex-shrink:0;position:relative;}',
      '#nf-wa:hover #nf-wa-bubble{transform:scale(1.08);box-shadow:0 6px 24px rgba(37,211,102,.5);}',
      '#nf-wa-bubble svg{width:28px;height:28px;fill:#fff;}',
      '#nf-wa-label{background:#0e0e10;color:#f0ede6;font-family:"DM Sans",system-ui,sans-serif;font-size:13px;font-weight:500;padding:8px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.1);white-space:nowrap;opacity:0;transform:translateX(10px);transition:opacity .2s ease,transform .2s ease;pointer-events:none;}',
      '#nf-wa:hover #nf-wa-label{opacity:1;transform:translateX(0);}',
      '#nf-wa-ping{position:absolute;top:0;right:0;width:14px;height:14px;background:#ffd166;border-radius:50%;border:2px solid #0a0a0a;animation:nf-ping 1.8s ease-in-out infinite;}',
      '@keyframes nf-ping{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.3);opacity:.6;}}'
    ].join('');
    document.head.appendChild(waStyle);

    var waUrl = WHATSAPP_IN + '?text=' + encodeURIComponent('Hello NoirFleet, I would like to book a premium chauffeur service.');
    var wa = document.createElement('a');
    wa.id = 'nf-wa';
    wa.href = waUrl;
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.setAttribute('aria-label', 'Chat with NoirFleet on WhatsApp');
    wa.innerHTML =
      '<div id="nf-wa-label">Chat with us</div>' +
      '<div id="nf-wa-bubble">' +
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>' +
          '<path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.833L.057 23.885a.5.5 0 0 0 .606.61l6.187-1.42A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.032-1.388l-.36-.214-3.733.857.897-3.617-.235-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>' +
        '</svg>' +
        '<div id="nf-wa-ping"></div>' +
      '</div>';
    document.body.appendChild(wa);
  })();

})();
