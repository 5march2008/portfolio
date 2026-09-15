/* =====================================================
   PAGE LOAD / SCROLL POSITION FIX
===================================================== */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }

  window.scrollTo(0, 0);
});


/* =====================================================
   HELPER FUNCTION
===================================================== */

function getElement(id) {
  return document.getElementById(id);
}


/* =====================================================
   CERTIFICATIONS TOGGLE
===================================================== */

const certToggle = getElement("certToggle");
const orgAccordion = getElement("orgAccordion");

if (certToggle && orgAccordion) {
  certToggle.addEventListener("click", function () {
    const isHidden =
      orgAccordion.style.display === "none" ||
      orgAccordion.style.display === "";

    orgAccordion.style.display = isHidden ? "block" : "none";
  });
}


/* =====================================================
   REHAL EDUCATION TOGGLE
===================================================== */

const rehalToggle = getElement("rehalToggle");
const rehalClosed = getElement("rehalClosed");
const rehalOpen = getElement("rehalOpen");
const rehalToggleLabel = getElement("rehalToggleLabel");

if (
  rehalToggle &&
  rehalClosed &&
  rehalOpen &&
  rehalToggleLabel
) {
  rehalToggle.addEventListener("click", function () {
    const isClosed =
      rehalOpen.style.display === "none" ||
      rehalOpen.style.display === "";

    if (isClosed) {
      rehalClosed.style.display = "none";
      rehalOpen.style.display = "block";
      rehalToggleLabel.textContent = "🔒 Close";
    } else {
      rehalClosed.style.display = "block";
      rehalOpen.style.display = "none";
      rehalToggleLabel.textContent = "🔓 Explore Me";
    }
  });
}


/* =====================================================
   ANIMATED ROLE TEXT
===================================================== */

const roleText = getElement("roleText");

const roles = [
  "a Science Student",
  "an Aspiring Biotechnologist",
  "an Independent Learner"
];

let roleIndex = 0;

if (roleText) {
  setInterval(function () {
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.textContent = roles[roleIndex];
  }, 2500);
}


/* =====================================================
   HAMBURGER NAVIGATION
===================================================== */

const navToggle = getElement("navToggle");
const navLinks = getElement("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("is-open");
  });
}


/* =====================================================
   STAT COUNTERS
===================================================== */

const statNumbers = document.querySelectorAll(".stat-number");

statNumbers.forEach(function (stat) {
  const target = parseInt(stat.getAttribute("data-target"), 10);

  if (isNaN(target)) return;

  let current = 0;
  const increment = target / 30;

  const counter = setInterval(function () {
    current += increment;

    if (current >= target) {
      stat.textContent = target;
      clearInterval(counter);
    } else {
      stat.textContent = Math.floor(current);
    }
  }, 40);
});


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("active");
  });
}


/* =====================================================
   SCROLL PERFORMANCE FIX
===================================================== */

let scrollStopTimer;
let lastScrollTop = window.scrollY;
let lastScrollTime = performance.now();

const fadeOverlay = document.querySelector(
  ".scroll-fade-overlay"
);

window.addEventListener("scroll", function () {
  document.body.classList.add("is-scrolling");

  const now = performance.now();
  const currentScrollTop = window.scrollY;
  const timeDelta = now - lastScrollTime;
  const distance = Math.abs(
    currentScrollTop - lastScrollTop
  );

  const speed =
    timeDelta > 0 ? distance / timeDelta : 0;

  if (fadeOverlay && speed > 2.5) {
    fadeOverlay.classList.add("show");
  }

  lastScrollTop = currentScrollTop;
  lastScrollTime = now;

  clearTimeout(scrollStopTimer);

  scrollStopTimer = setTimeout(function () {
    document.body.classList.remove("is-scrolling");

    if (fadeOverlay) {
      fadeOverlay.classList.remove("show");
    }
  }, 150);
});


/* =====================================================
   CERTIFICATE LIGHTBOX
===================================================== */

const certLightbox = getElement("certLightbox");
const certLightboxImg = getElement("certLightboxImg");
const certLightboxClose = getElement(
  "certLightboxClose"
);

const certificateLinks = document.querySelectorAll(
  ".cert-node, .legend-item, .feature-cert-link, .feature-view-link"
);

certificateLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const href = link.getAttribute("href");

    const isLocalCertificate =
      href &&
      href.startsWith("assets/certifications/");

    if (
      isLocalCertificate &&
      certLightbox &&
      certLightboxImg
    ) {
      event.preventDefault();

      const image =
        link.querySelector("img") ||
        (link.tagName === "IMG" ? link : null);

      const imageSource =
        image && image.src ? image.src : href;

      certLightboxImg.src = imageSource;
      certLightbox.classList.add("show");
    }
  });
});

if (certLightboxClose && certLightbox) {
  certLightboxClose.addEventListener("click", function () {
    certLightbox.classList.remove("show");
  });
}

if (certLightbox) {
  certLightbox.addEventListener("click", function (event) {
    if (event.target === certLightbox) {
      certLightbox.classList.remove("show");
    }
  });
}


/* =====================================================
   SUPABASE CONNECTION
===================================================== */

/*
  Keep your existing Supabase values here.
  Do not share your key publicly.
*/

const SUPABASE_URL =
  "https://kenpaoyjbicbvsogecmg.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ftendUcY6moUA8ty4w3dfA_HMEqFD7p";

let supabaseClient = null;

if (
  window.supabase &&
  typeof window.supabase.createClient === "function"
) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
}


/* =====================================================
   SAFE TEXT FUNCTION
===================================================== */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =====================================================
   LOAD CERTIFICATES FROM SUPABASE
===================================================== */

async function loadCertificatesFromSupabase() {
  const grid = document.getElementById("dynamicCertGrid");
  const section = document.getElementById(
    "new-certifications-section"
  );

  if (!grid || !section) {
    console.error("Certificate section not found in HTML.");
    return;
  }

  if (!supabaseClient) {
    console.error("Supabase client is not available.");
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("certificates")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      throw error;
    }

    grid.innerHTML = "";

    if (!data || data.length === 0) {
      section.style.display = "none";
      console.log("No certificates found.");
      return;
    }

    section.style.display = "block";

    data.forEach(function (cert) {
      const card = document.createElement("div");
      card.className = "card";

      /* Certificate image */
      if (cert.image_url) {
        const image = document.createElement("img");

        image.src = cert.image_url;
        image.alt = cert.title || "Certificate";
        image.className = "cert-img";
        image.loading = "lazy";

        /* Open image in the existing lightbox */
        image.style.cursor = "zoom-in";

        image.addEventListener("click", function () {
          const lightbox = document.getElementById(
            "certLightbox"
          );

          const lightboxImage = document.getElementById(
            "certLightboxImg"
          );

          if (lightbox && lightboxImage) {
            lightboxImage.src = cert.image_url;
            lightbox.classList.add("show");
          } else {
            window.open(cert.image_url, "_blank");
          }
        });

        card.appendChild(image);
      }

      /* Certificate title */
      const title = document.createElement("h3");
      title.textContent =
        cert.title || "Untitled Certificate";

      card.appendChild(title);

      /* Issuer */
      if (cert.issuer) {
        const issuer = document.createElement("p");
        issuer.className = "card-org";
        issuer.textContent = cert.issuer;

        card.appendChild(issuer);
      }

      /* Verification link */
      if (cert.certificate_url) {
        const link = document.createElement("a");

        link.href = cert.certificate_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "discover-link";
        link.innerHTML =
          'View Certificate <span class="arrow">→</span>';

        card.appendChild(link);
      }

      grid.appendChild(card);
    });

    console.log(
      data.length + " certificate(s) loaded successfully."
    );
  } catch (error) {
    console.error(
      "Supabase certificate loading error:",
      error
    );

    grid.innerHTML = `
      <p style="color:#DCE9EE;">
        Certificates could not be loaded.
      </p>
    `;
  }
}

loadCertificatesFromSupabase();


/* =====================================================
   LOAD PROJECTS FROM SUPABASE
===================================================== */

async function loadProjectsFromSupabase() {
  const projectGrid = getElement(
    "dynamicProjectGrid"
  );

  if (!projectGrid || !supabaseClient) {
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("projects")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return;
    }

    const projectSection = getElement(
      "new-projects-section"
    );

    if (projectSection) {
      projectSection.style.display = "block";
    }

    projectGrid.innerHTML = "";

    data.forEach(function (project) {
      const card = document.createElement("div");
      card.className = "card";

      const title = escapeHTML(project.title);
      const category = escapeHTML(
        project.category
      );
      const description = escapeHTML(
        project.description
      );
      const technologies = escapeHTML(
        project.technologies
      );
      const imageURL = escapeHTML(
        project.image_url
      );
      const projectURL = escapeHTML(
        project.project_url
      );

      card.innerHTML = `
        ${
          imageURL
            ? `
              <img
                src="${imageURL}"
                alt="${title}"
                class="cert-img"
                loading="lazy"
                onerror="this.style.display='none';"
              >
            `
            : ""
        }

        <h3>${title}</h3>

        <p class="card-org">
          ${category}
        </p>

        <p>
          ${description}
        </p>

        ${
          technologies
            ? `
              <p class="card-org">
                Technologies: ${technologies}
              </p>
            `
            : ""
        }

        ${
          projectURL
            ? `
              <a
                href="${projectURL}"
                target="_blank"
                rel="noopener noreferrer"
                class="discover-link"
              >
                View Project
                <span class="arrow">→</span>
              </a>
            `
            : ""
        }
      `;

      projectGrid.appendChild(card);
    });

    console.log(
      `${data.length} project(s) loaded successfully.`
    );
  } catch (error) {
    console.error(
      "Supabase project loading error:",
      error
    );

    projectGrid.innerHTML = `
      <p style="color:#DCE9EE;">
        Unable to load projects right now.
      </p>
    `;
  }
}


/* =====================================================
   START SUPABASE LOADERS
===================================================== */

loadCertificatesFromSupabase();
loadProjectsFromSupabase();
