// Fix: prevent browser from jumping to a scroll position (e.g. #contact-form) on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', function() {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);
});

// Certifications toggle (show/hide the whole organization list)
document.getElementById("certToggle").addEventListener("click", function() {
  const accordion = document.getElementById("orgAccordion");
  accordion.style.display = accordion.style.display === "none" ? "block" : "none";
});

// Rehal (Education) toggle - works both ways
document.getElementById("rehalToggle").addEventListener("click", function() {
  const closed = document.getElementById("rehalClosed");
  const open = document.getElementById("rehalOpen");
  const label = document.getElementById("rehalToggleLabel");
  if (open.style.display === "none" || open.style.display === "") {
    closed.style.display = "none";
    open.style.display = "block";
    label.textContent = "🔒 Close";
  } else {
    closed.style.display = "block";
    open.style.display = "none";
    label.textContent = "🔓 Explore Me";
  }
});

// Animated rotating role text
const roles = ["a Science Student", "an Aspiring Biotechnologist", "an Independent Learner"];
let roleIndex = 0;
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  document.getElementById("roleText").textContent = roles[roleIndex];
}, 2500);

// Hamburger nav toggle
document.getElementById("navToggle").addEventListener("click", function() {
  document.getElementById("navLinks").classList.toggle("open");
  this.classList.toggle("is-open");
});

// Stat counters (count up on load)
const statNumbers = document.querySelectorAll(".stat-number");
statNumbers.forEach(stat => {
  const target = parseInt(stat.getAttribute("data-target"));
  let current = 0;
  const increment = target / 30;
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      stat.textContent = target;
      clearInterval(counter);
    } else {
      stat.textContent = Math.floor(current);
    }
  }, 40);
});

// Scroll-reveal animation for sections
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// Pause heavy Certifications animations while actively scrolling (fixes stutter)
// and show a brief fade overlay during very fast scrolling
let scrollStopTimer;
let lastScrollTop = window.scrollY;
let lastScrollTime = performance.now();
const fadeOverlay = document.querySelector(".scroll-fade-overlay");

window.addEventListener('scroll', () => {
  document.body.classList.add('is-scrolling');

  const now = performance.now();
  const currentScrollTop = window.scrollY;
  const timeDelta = now - lastScrollTime;
  const distance = Math.abs(currentScrollTop - lastScrollTop);
  const speed = timeDelta > 0 ? distance / timeDelta : 0;

  if (fadeOverlay && speed > 2.5) {
    fadeOverlay.classList.add("show");
  }

  lastScrollTop = currentScrollTop;
  lastScrollTime = now;

  clearTimeout(scrollStopTimer);
  scrollStopTimer = setTimeout(() => {
    document.body.classList.remove('is-scrolling');
    if (fadeOverlay) fadeOverlay.classList.remove("show");
  }, 150);
});

// Certificate lightbox: local certificate images open in-page; real verification links open externally
const certLightbox = document.getElementById("certLightbox");
const certLightboxImg = document.getElementById("certLightboxImg");
const certLightboxClose = document.getElementById("certLightboxClose");

document.querySelectorAll(".cert-node, .legend-item, .feature-cert-link, .feature-view-link").forEach(function(link) {
  link.addEventListener("click", function(e) {
    const href = this.getAttribute("href");
    const isLocalCertificate = href && href.startsWith("assets/certifications/");
    if (isLocalCertificate) {
      e.preventDefault();
      const img = this.querySelector("img") || (this.tagName === "IMG" ? this : null);
      const imgSrc = img ? img.src : href;
      certLightboxImg.src = imgSrc;
      certLightbox.classList.add("show");
    }
    // otherwise, real verification link — let it open normally in a new tab
  });
});

certLightboxClose.addEventListener("click", function() {
  certLightbox.classList.remove("show");
});

certLightbox.addEventListener("click", function(e) {
  if (e.target === certLightbox) {
    certLightbox.classList.remove("show");
  }
});
// Load certificates from Supabase
const SUPABASE_URL = "https://kenpaoyjbicbvsogecmg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ftendUcY6moUA8ty4w3dfA_HMEqFD7p";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

async function loadCertificatesFromSupabase() {
  const grid = document.getElementById("dynamicCertGrid");

  if (!grid) return;

  try {
    const { data, error } = await supabaseClient
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      grid.innerHTML =
        '<p style="color:#DCE9EE;">No certificates added yet.</p>';
      return;
    }

    grid.innerHTML = "";

    data.forEach((cert) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${
          cert.image_url
            ? `<img src="${cert.image_url}" alt="${cert.title}" class="cert-img">`
            : ""
        }

        <h3>${cert.title}</h3>

        <p class="card-org">
          ${cert.issuer || ""}
        </p>

        ${
          cert.certificate_url
            ? `<a href="${cert.certificate_url}" target="_blank" rel="noopener noreferrer" class="discover-link">
                View Certificate <span class="arrow">→</span>
              </a>`
            : ""
        }
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Supabase certificate loading error:", error);

    grid.innerHTML =
      '<p style="color:#DCE9EE;">Unable to load certificates right now.</p>';
  }
}

loadCertificatesFromSupabase();
