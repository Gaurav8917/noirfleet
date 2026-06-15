(function () {

  const greetings = [
    { word: "Hello",       lang: "English" },
    { word: "नमस्ते",      lang: "Hindi" },
    { word: "Bonjour",     lang: "French" },
    { word: "مرحبا",       lang: "Arabic" },
    { word: "Hola",        lang: "Spanish" },
    { word: "こんにちは",   lang: "Japanese" },
    { word: "Ciao",        lang: "Italian" },
    { word: "Olá",         lang: "Portuguese" },
    { word: "Привет",      lang: "Russian" },
    { word: "வணக்கம்",    lang: "Tamil" },
    { word: "Guten Tag",   lang: "German" },
    { word: "你好",         lang: "Mandarin" },
  ];

  const TOTAL_DURATION = 5000;
  const PER_WORD       = Math.floor(TOTAL_DURATION / greetings.length);

  /* ── Build splash HTML ── */
  const splash = document.createElement('div');
  splash.id = 'nf-splash';
  splash.innerHTML = `
    <div id="nf-splash-logo">NoirFleet</div>
    <div id="nf-splash-word"></div>
    <div id="nf-splash-lang"></div>
    <div id="nf-splash-dots"></div>
    <div id="nf-splash-bar"></div>
  `;

  /* ── Styles ── */
  const style = document.createElement('style');
  style.textContent = `
    #nf-splash {
      position: fixed;
      inset: 0;
      background: #0a0a0a;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      overflow: hidden;
    }
    #nf-splash-logo {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13px;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: rgba(255,209,102,0.5);
      margin-bottom: 48px;
    }
    #nf-splash-word {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(52px, 10vw, 96px);
      font-weight: 400;
      color: #ffd166;
      letter-spacing: 0.05em;
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    #nf-splash-word.nf-visible {
      opacity: 1;
      transform: translateY(0);
    }
    #nf-splash-word.nf-fadeout {
      opacity: 0;
      transform: translateY(-12px);
    }
    #nf-splash-lang {
      font-family: Georgia, serif;
      font-size: 12px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.25);
      margin-top: 20px;
      min-height: 20px;
      transition: opacity 0.3s ease;
      opacity: 0;
    }
    #nf-splash-dots {
      display: flex;
      gap: 8px;
      margin-top: 52px;
    }
    .nf-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(255,209,102,0.2);
      transition: background 0.3s ease;
    }
    .nf-dot.nf-active {
      background: #ffd166;
    }
    #nf-splash-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background: #ffd166;
      width: 0%;
    }
    #nf-splash.nf-exit {
      opacity: 0;
      transition: opacity 0.6s ease;
      pointer-events: none;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(splash);

  /* ── Build dots ── */
  const dotsEl = document.getElementById('nf-splash-dots');
  greetings.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'nf-dot';
    d.id = 'nf-dot-' + i;
    dotsEl.appendChild(d);
  });

  const wordEl = document.getElementById('nf-splash-word');
  const langEl = document.getElementById('nf-splash-lang');
  const bar    = document.getElementById('nf-splash-bar');

  /* ── Progress bar ── */
  bar.style.transition = 'width ' + TOTAL_DURATION + 'ms linear';
  setTimeout(() => { bar.style.width = '100%'; }, 60);

  /* ── Word cycle ── */
  let current = 0;

  function showWord(i) {
    wordEl.classList.remove('nf-visible', 'nf-fadeout');
    langEl.style.opacity = '0';

    setTimeout(() => {
      wordEl.textContent = greetings[i].word;
      wordEl.classList.add('nf-visible');
      langEl.textContent = greetings[i].lang;
      langEl.style.opacity = '1';
      document.querySelectorAll('.nf-dot').forEach((d, j) => {
        d.classList.toggle('nf-active', j === i);
      });
    }, 100);
  }

  function nextWord() {
    if (current >= greetings.length) {
      endSplash();
      return;
    }
    showWord(current);
    current++;
    setTimeout(nextWord, PER_WORD);
  }

  function endSplash() {
    wordEl.classList.add('nf-fadeout');
    setTimeout(() => {
      splash.classList.add('nf-exit');
      setTimeout(() => {
        splash.remove();
        style.remove();
      }, 700);
    }, 400);
  }

  /* ── Only show once per session (not on every page load) ── */
  if (!sessionStorage.getItem('nf-splash-shown')) {
    sessionStorage.setItem('nf-splash-shown', '1');
    nextWord();
  } else {
    splash.remove();
    style.remove();
  }

})();
