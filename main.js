// =============================================
// BAYOUR — main.js
// =============================================

// Auto-update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// =============================================
// NAV — scroll effect + hamburger
// =============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// =============================================
// PLAYER MODAL
// =============================================

const releases = {
  passion: {
    embed: `<iframe style="border-radius:12px;margin-top:2.5rem" src="https://open.spotify.com/embed/track/1J0ggvhnYHafhsI1sxWP20?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  },
  rttaf: {
    embed: `<iframe style="border-radius:12px;margin-top:2.5rem" src="https://open.spotify.com/embed/album/3LlCe1qTWNFmJe4VaPuHF6?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  }
};

function openPlayer(id) {
  const modal = document.getElementById('playerModal');
  const backdrop = document.getElementById('modalBackdrop');
  const embed = document.getElementById('playerEmbed');

  if (releases[id]) {
    embed.innerHTML = releases[id].embed;
    modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePlayer() {
  const modal = document.getElementById('playerModal');
  const backdrop = document.getElementById('modalBackdrop');
  const embed = document.getElementById('playerEmbed');

  modal.classList.remove('active');
  backdrop.classList.remove('active');
  document.body.style.overflow = '';

  // Destroy embed to stop playback
  setTimeout(() => {
    embed.innerHTML = '';
  }, 300);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePlayer();
});

// =============================================
// SCROLL REVEAL
// =============================================

const revealEls = document.querySelectorAll(
  '.release-card, .about-grid, .merch-coming, .social-card, .section-title, .section-eyebrow'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

// =============================================
// MERCH EMAIL
// =============================================

function submitMerchEmail() {
  const input = document.getElementById('merchEmail');
  const confirm = document.getElementById('merchConfirm');
  const email = input.value.trim();

  if (!email || !email.includes('@')) {
    confirm.style.color = '#ff6b6b';
    confirm.textContent = 'Enter a valid email address.';
    return;
  }

  // Store in localStorage for now (replace with backend later)
  const existing = JSON.parse(localStorage.getItem('bayour_merch_emails') || '[]');
  if (!existing.includes(email)) {
    existing.push(email);
    localStorage.setItem('bayour_merch_emails', JSON.stringify(existing));
  }

  input.value = '';
  confirm.style.color = '';
  confirm.textContent = "You're on the list. Watch this space.";
}

// Allow Enter key on merch input
document.getElementById('merchEmail').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitMerchEmail();
});
