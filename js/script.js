// ---------- State ----------
let currentPage = 1;
const totalPages = 8;
let heartTapCount = 0;
let currentCardIndex = 0;
let wishMade = false;
let musicPlaying = false;

// ---------- Initialization ----------
document.addEventListener('DOMContentLoaded', () => {
  createPageDots();
  createFloatingHearts();
  updateDots();
});

// ---------- Page Navigation ----------
function goToPage(pageNumber) {
  if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) return;

  const currentEl = document.getElementById(`page-${currentPage}`);
  const nextEl = document.getElementById(`page-${pageNumber}`);

  // Fade out current
  currentEl.classList.add('fade-out');
  currentEl.classList.remove('active');

  // After fade-out, bring in next
  setTimeout(() => {
    currentEl.classList.remove('fade-out');
    nextEl.classList.add('active');
    currentPage = pageNumber;
    updateDots();

    // Page-specific init
    onPageEnter(pageNumber);
  }, 620);
}

function onPageEnter(pageNumber) {
  if (pageNumber === 5) {
    createBouquetSparkles();
  }
  if (pageNumber === 6) {
    revealPersonalMessage();
  }
}

// ---------- Bouquet Sparkle Stars ----------
function createBouquetSparkles() {
  const container = document.getElementById('bouquet-sparkles');
  if (container.children.length > 0) return; // already created

  const starCount = 36;
  const colors = ['#ffd700', '#fff', '#ffb6c1', '#f8c8d8', '#e8a0b4', '#fffacd', '#ffc0cb', '#ffe4b5'];

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('bouquet-star');

    // 4-pointed star SVG
    const color = colors[Math.floor(Math.random() * colors.length)];
    star.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9Z" fill="${color}"/></svg>`;

    const size = 8 + Math.random() * 18;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = (Math.random() * 100) + '%';
    star.style.top = (Math.random() * 100) + '%';
    star.style.animationDuration = (1 + Math.random() * 2) + 's';
    star.style.animationDelay = (Math.random() * 2) + 's';

    container.appendChild(star);
  }
}

// ---------- Page Dots ----------
function createPageDots() {
  const dotsContainer = document.getElementById('page-dots');
  for (let i = 1; i <= totalPages; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 1) dot.classList.add('active');
    dot.addEventListener('click', () => goToPage(i));
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index + 1 === currentPage);
  });
}

// ---------- Floating Background Hearts ----------
function createFloatingHearts() {
  const container = document.getElementById('floating-hearts-bg');
  const hearts = ['♥', '♡', '❤', '💕'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.classList.add('bg-heart');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = (Math.random() * 10) + 's';
    heart.style.fontSize = (10 + Math.random() * 14) + 'px';
    heart.style.color = `hsl(${340 + Math.random() * 30}, ${60 + Math.random() * 30}%, ${65 + Math.random() * 20}%)`;
    container.appendChild(heart);
  }
}

// ---------- Page 2 — Heart Tap ----------
function tapHeart() {
  heartTapCount++;

  // Create burst hearts
  const container = document.getElementById('heart-burst-container');
  const burstCount = 5 + Math.floor(Math.random() * 4);

  for (let i = 0; i < burstCount; i++) {
    const h = document.createElement('span');
    h.classList.add('burst-heart');
    h.textContent = ['❤️', '💕', '💗', '💖', '♥'][Math.floor(Math.random() * 5)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 80;
    h.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    h.style.setProperty('--ty', (Math.sin(angle) * dist - 40) + 'px');
    container.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }

  // Reveal message after 3 taps
  if (heartTapCount >= 1) {
    const revealText = document.getElementById('heart-reveal-text');
    const continueBtn = document.getElementById('page2-continue');
    revealText.classList.add('visible');
    setTimeout(() => continueBtn.classList.add('visible'), 400);
  }
}

// ---------- Page 3 — Photo Lightbox ----------
function openPhoto(polaroid) {
  const img = polaroid.querySelector('img');
  const caption = polaroid.getAttribute('data-caption');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');

  lbImg.src = img.src;
  lbCaption.textContent = caption || '';
  lightbox.classList.add('open');
}

function closePhoto(event) {
  const lightbox = document.getElementById('lightbox');
  const content = lightbox.querySelector('.lightbox-content');

  // Only close if clicking outside the content
  if (!content.contains(event.target)) {
    lightbox.classList.remove('open');
  }
}

// ---------- Page 4 — Message Cards ----------
function revealNextCard() {
  const cards = document.querySelectorAll('.message-card');
  const btn = document.getElementById('reveal-next-btn');

  // Hide current card
  cards[currentCardIndex].classList.remove('active');

  currentCardIndex++;

  if (currentCardIndex >= cards.length) {
    // All cards shown, go to next page
    btn.textContent = 'Continue ❤️';
    btn.onclick = () => goToPage(5);
    // Show last card briefly before transition
    currentCardIndex = cards.length - 1;
    cards[currentCardIndex].classList.add('active');
    return;
  }

  // Show next card
  cards[currentCardIndex].classList.add('active');

  // Update button text for last card
  if (currentCardIndex === cards.length - 1) {
    btn.textContent = 'Continue ❤️';
    btn.onclick = () => goToPage(5);
  }
}


// ---------- Page 6 — Personal Message Reveal ----------
function revealPersonalMessage() {
  const lines = document.querySelectorAll('.msg-line');
  const continueBtn = document.getElementById('page6-continue');

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, 800 + index * 1200);
  });

  // Show continue button after all lines
  setTimeout(() => {
    continueBtn.classList.add('visible');
  }, 800 + lines.length * 1200 + 500);
}

// ---------- Page 7 — Birthday Wish + Fireworks ----------
let fireworksAnimId = null;

function makeWish() {
  const btn = document.getElementById('wish-btn');
  btn.style.opacity = '0';
  btn.style.pointerEvents = 'none';
  wishMade = true;

  startFireworks();

  // Show celebration message after fireworks start
  setTimeout(() => {
    document.getElementById('celebration-msg').classList.add('visible');
  }, 1200);
}

// --- Fireworks Engine (Canvas) ---
function startFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const rockets = [];
  const colors = ['#ff69b4','#ffd700','#ff1493','#f8c8d8','#e8a0b4','#fff','#c9a86c','#d4768e','#ff6b81','#ffa8c5'];
  let frameCount = 0;
  const duration = 5 * 60; // ~5 seconds at 60fps

  function Rocket(x) {
    this.x = x;
    this.y = canvas.height;
    this.targetY = canvas.height * (0.15 + Math.random() * 0.35);
    this.speed = 4 + Math.random() * 3;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.trail = [];
    this.exploded = false;
  }

  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = 0.012 + Math.random() * 0.018;
    this.color = color;
    this.size = 1.5 + Math.random() * 2;
  }

  function spawnRocket() {
    const x = canvas.width * (0.15 + Math.random() * 0.7);
    rockets.push(new Rocket(x));
  }

  function explode(rocket) {
    const count = 50 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(rocket.x, rocket.y, rocket.color));
    }
    // Add a few heart-shaped bursts
    for (let i = 0; i < 6; i++) {
      const p = new Particle(rocket.x, rocket.y, '#ff69b4');
      p.size = 3 + Math.random() * 2;
      p.decay = 0.008 + Math.random() * 0.01;
      particles.push(p);
    }
  }

  function animate() {
    frameCount++;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    // Spawn rockets periodically
    if (frameCount < duration && frameCount % 20 === 0) {
      spawnRocket();
      if (Math.random() > 0.5) spawnRocket(); // sometimes two at once
    }

    // Update rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 6) r.trail.shift();
      r.y -= r.speed;

      // Draw trail
      for (let t = 0; t < r.trail.length; t++) {
        ctx.beginPath();
        ctx.arc(r.trail[t].x, r.trail[t].y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.globalAlpha = t / r.trail.length * 0.5;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw rocket head
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      if (r.y <= r.targetY) {
        explode(r);
        rockets.splice(i, 1);
      }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // gravity
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    if (frameCount < duration || particles.length > 0 || rockets.length > 0) {
      fireworksAnimId = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworksAnimId = null;
    }
  }

  // Initial burst of 3 rockets
  spawnRocket();
  spawnRocket();
  spawnRocket();
  animate();
}

function stopFireworks() {
  if (fireworksAnimId) {
    cancelAnimationFrame(fireworksAnimId);
    fireworksAnimId = null;
  }
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ---------- Reset Everything ----------
function resetAll() {
  // Reset state variables
  heartTapCount = 0;
  currentCardIndex = 0;
  wishMade = false;

  // Page 2 — hide revealed text and continue button
  document.getElementById('heart-reveal-text').classList.remove('visible');
  document.getElementById('page2-continue').classList.remove('visible');

  // Page 4 — reset message cards to first card active
  const cards = document.querySelectorAll('.message-card');
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === 0);
  });
  const revealBtn = document.getElementById('reveal-next-btn');
  revealBtn.textContent = 'Reveal next →';
  revealBtn.onclick = revealNextCard;

  // Page 5 — reset sparkles
  document.getElementById('bouquet-sparkles').innerHTML = '';

  // Page 6 — reset personal message lines and continue button
  document.querySelectorAll('.msg-line').forEach(l => l.classList.remove('visible'));
  document.getElementById('page6-continue').classList.remove('visible');

  // Page 7 — reset wish button, celebration, fireworks
  const wishBtn = document.getElementById('wish-btn');
  wishBtn.textContent = 'Make the Wish ✨';
  wishBtn.style.opacity = '1';
  wishBtn.style.pointerEvents = 'auto';
  wishBtn.onclick = makeWish;
  document.getElementById('celebration-msg').classList.remove('visible');
  document.getElementById('confetti-container').innerHTML = '';
  stopFireworks();

  // Navigate to page 1
  goToPage(1);
}

// ---------- Music ----------
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

function startMusic() {
  if (musicPlaying) return;

  bgMusic.volume = 0.4;

  bgMusic.play().then(() => {
    musicPlaying = true;
    musicBtn.classList.add('playing');
    musicBtn.querySelector('.music-icon').textContent = '♫';
  }).catch(() => {
    // Browser blocked autoplay — wait for first user interaction
  });
}

function stopMusic() {
  bgMusic.pause();
  musicPlaying = false;
  musicBtn.classList.remove('playing');
  musicBtn.querySelector('.music-icon').textContent = '♪';
}

function toggleMusic() {
  musicPlaying ? stopMusic() : startMusic();
}

musicBtn.addEventListener('click', toggleMusic);

// Try autoplay when page loads
document.addEventListener('DOMContentLoaded', () => {
  startMusic();
});

// If autoplay is blocked, start on the first interaction
['click', 'touchstart', 'keydown'].forEach(event => {
  document.addEventListener(event, () => {
    if (!musicPlaying) startMusic();
  }, { once: true });
});