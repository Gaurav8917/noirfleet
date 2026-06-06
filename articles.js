/* ════════════════════════════════════════════════════════════════════
   NoirFleet — Travel Journal Articles
   ────────────────────────────────────────────────────────────────────
   THIS IS THE ONLY FILE YOU EDIT TO POST A NEW ARTICLE.

   To add a new article each day:
     1. Copy the TEMPLATE block below.
     2. Paste it at the TOP of the NF_ARTICLES list (newest first).
     3. Fill in the fields and save. That's it — blog.html and
        article.html update automatically.

   FIELD GUIDE
     slug     : unique id used in the URL (lowercase, dashes, no spaces)
     title    : the headline
     date     : display date, e.g. "June 6, 2026"
     category : short tag shown on the card, e.g. "City Guide"
     image    : a photo filename in this same folder (e.g. "dubai.jpg")
                — use any image you upload; falls back gracefully if missing
     excerpt  : 1–2 sentence summary shown on the card
     content  : the full article. You can use simple HTML:
                  <p>paragraph</p>
                  <h2>section heading</h2>
                  <h3>smaller heading</h3>
                  <ul><li>bullet</li></ul>
                  <blockquote>a pulled quote</blockquote>
                  <img src="photo.jpg" alt="">

   ── TEMPLATE (copy me) ──────────────────────────────────────────────
   {
     slug: "my-article-slug",
     title: "My Article Title",
     date: "June 6, 2026",
     category: "Travel",
     image: "banner.png",
     excerpt: "A short one-line summary that appears on the journal card.",
     content: `
       <p>Opening paragraph...</p>
       <h2>A Section</h2>
       <p>More writing...</p>
     `
   },
   ────────────────────────────────────────────────────────────────────
════════════════════════════════════════════════════════════════════ */

const NF_ARTICLES = [

  {
    slug: "dubai-airport-to-downtown-the-smooth-way",
    title: "Dubai: Airport to Downtown, The Smooth Way",
    date: "June 5, 2026",
    category: "City Guide",
    image: "uae.jpg",
    excerpt: "From the moment you land at DXB to your first skyline view — how to glide into Dubai without a single wasted minute.",
    content: `
      <p>There is a particular calm in stepping off a long-haul flight and finding a chauffeur already waiting, name board in hand, the car cooled and a bottle of water chilled. Dubai rewards travellers who plan the small things, and the journey from Dubai International (DXB) to the heart of Downtown is the first of those small things worth getting right.</p>

      <h2>Timing the Arrival</h2>
      <p>DXB is one of the busiest airports on earth, and the difference between a 25-minute transfer and an hour often comes down to the hour of day. Mid-morning and late evening tend to flow best. A driver who tracks your flight will adjust automatically if you land early or late — no frantic messages, no waiting at an empty kerb.</p>

      <h2>The Route Worth Taking</h2>
      <p>Most transfers default to Sheikh Zayed Road, and for good reason: the skyline reveal as you approach Downtown is genuinely cinematic. If traffic builds, Al Khail Road runs parallel and quieter, costing you the view but saving the clock.</p>

      <blockquote>The best transfer is the one you forget you took — because nothing about it asked for your attention.</blockquote>

      <h3>A Few Local Notes</h3>
      <ul>
        <li>Fridays start slow and end busy — plan dinner reservations accordingly.</li>
        <li>The Dubai Fountain shows run every 30 minutes in the evening; ask your driver to time the arrival.</li>
        <li>Summers are intense. A pre-cooled car is not a luxury here, it is a necessity.</li>
      </ul>

      <p>Whether you're in town for a meeting at DIFC or a weekend by the marina, the principle holds: let the logistics disappear, and the city opens up.</p>
    `
  },

  {
    slug: "five-things-that-make-an-airport-transfer-truly-premium",
    title: "Five Things That Make an Airport Transfer Truly Premium",
    date: "June 3, 2026",
    category: "Travel Tips",
    image: "airport_rides.jpg",
    excerpt: "Anyone can send a car. The difference between a ride and a premium transfer lives in five small, deliberate details.",
    content: `
      <p>The word "premium" gets attached to a lot of car services. After thousands of transfers across fifty countries, we've learned that real premium isn't about the badge on the bonnet — it's about a handful of details that consistently separate a forgettable ride from one you book again.</p>

      <h2>1. Flight Tracking That Actually Works</h2>
      <p>Your flight is early. Your flight is delayed three hours. A premium service already knows, and the driver's arrival shifts silently to match. You should never have to update anyone.</p>

      <h2>2. The Meet-and-Greet</h2>
      <p>A name board at arrivals, help with luggage, and a walk to the car that feels unhurried. The first ninety seconds set the tone for the entire journey.</p>

      <h2>3. A Genuinely Clean Car</h2>
      <p>Spotless interiors aren't a bonus — they're the baseline. Chilled water, a phone charger, and climate already set to comfortable.</p>

      <h2>4. A Quote That Doesn't Move</h2>
      <p>No surge pricing. No mysterious fees on arrival. The number you agreed to is the number you pay.</p>

      <h2>5. A Driver Who Reads the Room</h2>
      <p>Some passengers want conversation and local tips. Others want silence and a window. A great chauffeur senses which, and delivers it without being asked.</p>

      <p>None of these are expensive to do. They're simply chosen, every single time.</p>
    `
  },

  {
    slug: "a-weekend-in-london-by-car",
    title: "A Weekend in London, By Car",
    date: "June 1, 2026",
    category: "City Guide",
    image: "uk.jpg",
    excerpt: "London rewards those who move with intention. A two-day itinerary that trades the queue for the quiet luxury of a waiting car.",
    content: `
      <p>London is a city of villages stitched together, and the joy of exploring it by car is the freedom to hop between them on your own schedule — Mayfair for breakfast, the South Bank by afternoon, a quiet Notting Hill dinner without ever consulting a tube map.</p>

      <h2>Saturday</h2>
      <p>Begin in Mayfair with a slow coffee, then a short transfer to the museums of South Kensington before the crowds arrive. By midday, glide east to the South Bank — the walk along the river is best done on foot, with the car meeting you at the far end near the Tate.</p>

      <h3>Lunch Worth the Detour</h3>
      <ul>
        <li>Borough Market for something casual and excellent.</li>
        <li>A river-view table if the weather cooperates.</li>
      </ul>

      <h2>Sunday</h2>
      <p>Sundays are for the parks and the markets. Columbia Road in the morning, then a leisurely drive west to Notting Hill. The beauty of a private car here is simple: you carry your finds, your coats, and your tired feet without thinking about any of it.</p>

      <blockquote>The luxury of a great city isn't seeing everything — it's choosing what to see, and arriving unhurried.</blockquote>

      <p>Two days, a dozen neighbourhoods, and not a single moment spent figuring out how to get from one to the next.</p>
    `
  }

];

/* Make available to blog.html and article.html */
if (typeof window !== "undefined") { window.NF_ARTICLES = NF_ARTICLES; }
