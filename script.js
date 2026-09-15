/* =========================================================
   HUBAIB ULLAH — BIOTECHNOLOGY PORTFOLIO JAVASCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   SUPABASE CONFIGURATION
   ========================================================= */

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let supabaseClient = null;

if (
  window.supabase &&
  SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
  SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}

/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeRevealAnimations();
  initializeCounters();
  initializeTypingEffect();
  initializeRehal();
  initializeCertificateLightbox();
  initializeContactForm();
  initializeSmoothScrolling();
  initializeDynamicData();
});

/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbarLinks = document.querySelector(".navbar-links");
  const navbar = document.querySelector(".navbar");

  if (!menuToggle || !navbarLinks) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");

    const isOpen = navbarLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".navbar-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navbarLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNavbar =
      navbar &&
      navbar.contains(event.target);

    if (!clickedInsideNavbar) {
      navbarLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("scroll", () => {
    if (!navbar) {
      return;
    }

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* =========================================================
   SMOOTH SCROLLING
   ========================================================= */

function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });

    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

/* =========================================================
   COUNTER ANIMATIONS
   ========================================================= */

function initializeCounters() {
  const counters = document.querySelectorAll("[data-count]");

  if (!counters.length) {
    return;
  }

  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);

    if (!Number.isFinite(target)) {
      return;
    }

    counter.textContent = "0";

    animateCounter(counter, target);
  });
}

function animateCounter(element, target) {
  const duration = 1600;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easedProgress =
      1 - Math.pow(1 - progress, 3);

    const currentValue = Math.floor(
      easedProgress * target
    );

    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(updateCounter);
}

/* =========================================================
   TYPING EFFECT
   ========================================================= */

function initializeTypingEffect() {
  const typingElement =
    document.querySelector("[data-typing]") ||
    document.querySelector(".typing-text") ||
    document.querySelector(".role-text");

  if (!typingElement) {
    return;
  }

  const roles = [
    "Science Student",
    "Aspiring Biotechnologist",
    "Independent Learner",
    "Biotechnology Enthusiast",
    "Future Researcher"
  ];

  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const typingSpeed = 85;
  const deletingSpeed = 45;
  const pauseAfterTyping = 1500;
  const pauseAfterDeleting = 500;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      typingElement.textContent =
        currentRole.substring(0, characterIndex + 1);

      characterIndex++;

      if (characterIndex === currentRole.length) {
        deleting = true;

        setTimeout(typeRole, pauseAfterTyping);
        return;
      }
    } else {
      typingElement.textContent =
        currentRole.substring(0, characterIndex - 1);

      characterIndex--;

      if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;

        setTimeout(typeRole, pauseAfterDeleting);
        return;
      }
    }

    setTimeout(
      typeRole,
      deleting ? deletingSpeed : typingSpeed
    );
  }

  typeRole();
}

/* =========================================================
   INTERACTIVE REHAL / EDUCATION OBJECT
   ========================================================= */

function initializeRehal() {
  const rehal =
    document.querySelector("#rehal") ||
    document.querySelector(".rehal") ||
    document.querySelector("[data-rehal]");

  const rehalButton =
    document.querySelector("#rehalToggle") ||
    document.querySelector(".rehal-toggle") ||
    document.querySelector("[data-rehal-toggle]");

  if (!rehal || !rehalButton) {
    return;
  }

  rehalButton.addEventListener("click", () => {
    const isOpen = rehal.classList.toggle("open");

    rehalButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    rehalButton.textContent = isOpen
      ? "🔒 Close Me"
      : "🔓 Explore Me";
  });
}

/* =========================================================
   CERTIFICATE LIGHTBOX
   ========================================================= */

function initializeCertificateLightbox() {
  const lightbox =
    document.querySelector("#certLightbox");

  const lightboxImage =
    document.querySelector("#certLightboxImg");

  const closeButton =
    document.querySelector("#certLightboxClose");

  if (!lightbox || !lightboxImage || !closeButton) {
    return;
  }

  document.addEventListener("click", (event) => {
    const image = event.target.closest(
      ".certificate-card img, " +
      ".certificate-image, " +
      "[data-certificate]"
    );

    if (!image) {
      return;
    }

    const imageSource =
      image.getAttribute("src") ||
      image.dataset.certificate;

    if (!imageSource) {
      return;
    }

    lightboxImage.src = imageSource;
    lightboxImage.alt =
      image.getAttribute("alt") ||
      "Certificate";

    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");

    setTimeout(() => {
      lightboxImage.src = "";
    }, 250);
  }

  closeButton.addEventListener(
    "click",
    closeLightbox
  );

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

/* =========================================================
   CONTACT FORM
   ========================================================= */

function initializeContactForm() {
  const contactForm =
    document.querySelector("#contactForm");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", () => {
    const submitButton =
      contactForm.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
  });
}

/* =========================================================
   GENERAL CARD INTERACTION
   ========================================================= */

function initializeCardInteractions() {
  const cards = document.querySelectorAll(
    ".project-card, " +
    ".certificate-card, " +
    ".webinar-card, " +
    ".info-card, " +
    ".skill-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hovered");
    });
  });
}

/* =========================================================
   DYNAMIC SUPABASE DATA
   ========================================================= */

async function initializeDynamicData() {
  if (!supabaseClient) {
    initializeCardInteractions();
    return;
  }

  await Promise.allSettled([
    loadCertificatesFromSupabase(),
    loadProjectsFromSupabase(),
    loadWebinarsFromSupabase(),
    loadVolunteeringFromSupabase(),
    loadInternshipFromSupabase()
  ]);

  initializeRevealAnimations();
  initializeCardInteractions();
}

/* =========================================================
   CERTIFICATES
   ========================================================= */

async function loadCertificatesFromSupabase() {
  if (!supabaseClient) {
    return;
  }

  const section =
    document.querySelector("#certifications-section");

  const grid =
    document.querySelector("#certificateGrid") ||
    document.querySelector("#certificationsGrid");

  if (!grid) {
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
      console.error(
        "Certificate loading error:",
        error
      );
      return;
    }

    if (!data || !data.length) {
      if (section) {
        section.style.display = "none";
      }

      return;
    }

    grid.innerHTML = "";

    data.forEach((certificate) => {
      grid.appendChild(
        createCertificateCard(certificate)
      );
    });

    if (section) {
      section.style.display = "";
    }
  } catch (error) {
    console.error(
      "Unexpected certificate error:",
      error
    );
  }
}

function createCertificateCard(certificate) {
  const card = document.createElement("article");

  card.className =
    "certificate-card reveal active";

  const title =
    certificate.title ||
    certificate.name ||
    "Biotechnology Certificate";

  const issuer =
    certificate.issuer ||
    certificate.organization ||
    certificate.platform ||
    "";

  const image =
    certificate.image_url ||
    certificate.image ||
    certificate.certificate_url ||
    "";

  const certificateLink =
    certificate.link ||
    certificate.url ||
    certificate.certificate_link ||
    "";

  card.innerHTML = `
    ${
      image
        ? `
          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(title)}"
            loading="lazy"
            class="certificate-image"
          >
        `
        : `
          <div class="certificate-placeholder">
            🧬
          </div>
        `
    }

    <div class="certificate-content">
      <h3>${escapeHTML(title)}</h3>
      ${
        issuer
          ? `<p>${escapeHTML(issuer)}</p>`
          : ""
      }

      ${
        certificateLink
          ? `
            <a
              href="${escapeHTML(certificateLink)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Certificate
            </a>
          `
          : ""
      }
    </div>
  `;

  return card;
}

/* =========================================================
   PROJECTS
   ========================================================= */

async function loadProjectsFromSupabase() {
  if (!supabaseClient) {
    return;
  }

  const section =
    document.querySelector("#new-projects-section");

  const grid =
    document.querySelector("#dynamicProjectGrid");

  if (!section || !grid) {
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
      console.error(
        "Project loading error:",
        error
      );
      return;
    }

    if (!data || !data.length) {
      section.style.display = "none";
      return;
    }

    grid.innerHTML = "";

    data.forEach((project) => {
      grid.appendChild(
        createProjectCard(project)
      );
    });

    section.style.display = "";
  } catch (error) {
    console.error(
      "Unexpected project error:",
      error
    );

    section.style.display = "none";
  }
}

function createProjectCard(project) {
  const card = document.createElement("article");

  card.className =
    "project-card reveal active";

  const title =
    project.title ||
    project.name ||
    "Biotechnology Project";

  const description =
    project.description ||
    project.summary ||
    "A biotechnology-related project.";

  const image =
    project.image_url ||
    project.image ||
    "";

  const projectLink =
    project.link ||
    project.url ||
    project.project_url ||
    "";

  card.innerHTML = `
    ${
      image
        ? `
          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(title)}"
            loading="lazy"
          >
        `
        : ""
    }

    <div class="project-card-content">
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(description)}</p>

      ${
        projectLink
          ? `
            <a
              href="${escapeHTML(projectLink)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Project
            </a>
          `
          : ""
      }
    </div>
  `;

  return card;
}

/* =========================================================
   WEBINARS
   ========================================================= */

async function loadWebinarsFromSupabase() {
  if (!supabaseClient) {
    return;
  }

  const section =
    document.querySelector("#new-webinars-section");

  const grid =
    document.querySelector("#dynamicWebinarGrid");

  if (!section || !grid) {
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("webinars")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      console.error(
        "Webinar loading error:",
        error
      );
      return;
    }

    if (!data || !data.length) {
      section.style.display = "none";
      return;
    }

    grid.innerHTML = "";

    data.forEach((webinar) => {
      grid.appendChild(
        createWebinarCard(webinar)
      );
    });

    section.style.display = "";
  } catch (error) {
    console.error(
      "Unexpected webinar error:",
      error
    );

    section.style.display = "none";
  }
}

function createWebinarCard(webinar) {
  const card = document.createElement("article");

  card.className =
    "webinar-card reveal active";

  const title =
    webinar.title ||
    webinar.name ||
    "Biotechnology Webinar";

  const organizer =
    webinar.organizer ||
    webinar.organization ||
    webinar.platform ||
    "";

  const date =
    webinar.date ||
    webinar.webinar_date ||
    "";

  const certificateLink =
    webinar.certificate_url ||
    webinar.certificate_link ||
    "";

  card.innerHTML = `
    <div class="webinar-card-content">
      <div class="webinar-icon">🎤</div>

      <h3>${escapeHTML(title)}</h3>

      ${
        organizer
          ? `<p>${escapeHTML(organizer)}</p>`
          : ""
      }

      ${
        date
          ? `<small>${escapeHTML(date)}</small>`
          : ""
      }

      ${
        certificateLink
          ? `
            <a
              href="${escapeHTML(certificateLink)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Certificate
            </a>
          `
          : ""
      }
    </div>
  `;

  return card;
}

/* =========================================================
   VOLUNTEERING
   ========================================================= */

async function loadVolunteeringFromSupabase() {
  if (!supabaseClient) {
    return;
  }

  const section =
    document.querySelector("#new-volunteering-section");

  const grid =
    document.querySelector("#dynamicVolunteeringGrid");

  if (!section || !grid) {
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("volunteering")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      console.error(
        "Volunteering loading error:",
        error
      );
      return;
    }

    if (!data || !data.length) {
      section.style.display = "none";
      return;
    }

    grid.innerHTML = "";

    data.forEach((activity) => {
      grid.appendChild(
        createVolunteeringCard(activity)
      );
    });

    section.style.display = "";
  } catch (error) {
    console.error(
      "Unexpected volunteering error:",
      error
    );

    section.style.display = "none";
  }
}

function createVolunteeringCard(activity) {
  const card = document.createElement("article");

  card.className =
    "volunteering-card reveal active";

  const title =
    activity.title ||
    activity.name ||
    "Volunteering Activity";

  const organization =
    activity.organization ||
    activity.organizer ||
    "";

  const description =
    activity.description ||
    activity.summary ||
    "";

  card.innerHTML = `
    <div class="volunteering-card-content">
      <div class="volunteering-icon">🤝</div>

      <h3>${escapeHTML(title)}</h3>

      ${
        organization
          ? `<p class="organization">
              ${escapeHTML(organization)}
            </p>`
          : ""
      }

      ${
        description
          ? `<p>${escapeHTML(description)}</p>`
          : ""
      }
    </div>
  `;

  return card;
}

/* =========================================================
   INTERNSHIP
   ========================================================= */

async function loadInternshipFromSupabase() {
  if (!supabaseClient) {
    return;
  }

  const section =
    document.querySelector("#new-internship-section");

  const grid =
    document.querySelector("#dynamicInternshipGrid");

  if (!section || !grid) {
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("internship")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      console.error(
        "Internship loading error:",
        error
      );
      return;
    }

    if (!data || !data.length) {
      section.style.display = "none";
      return;
    }

    grid.innerHTML = "";

    data.forEach((internship) => {
      grid.appendChild(
        createInternshipCard(internship)
      );
    });

    section.style.display = "";
  } catch (error) {
    console.error(
      "Unexpected internship error:",
      error
    );

    section.style.display = "none";
  }
}

function createInternshipCard(internship) {
  const card = document.createElement("article");

  card.className =
    "internship-card reveal active";

  const title =
    internship.title ||
    internship.position ||
    internship.name ||
    "Hospital Internship";

  const organization =
    internship.organization ||
    internship.hospital ||
    "";

  const description =
    internship.description ||
    internship.summary ||
    "";

  const date =
    internship.date ||
    internship.internship_date ||
    "";

  card.innerHTML = `
    <div class="internship-card-content">
      <div class="internship-icon">🏥</div>

      <h3>${escapeHTML(title)}</h3>

      ${
        organization
          ? `<p>${escapeHTML(organization)}</p>`
          : ""
      }

      ${
        description
          ? `<p>${escapeHTML(description)}</p>`
          : ""
      }

      ${
        date
          ? `<small>${escapeHTML(date)}</small>`
          : ""
      }
    </div>
  `;

  return card;
}

/* =========================================================
   HIDE EMPTY DYNAMIC SECTIONS
   ========================================================= */

function hideEmptyDynamicSections() {
  const sections = [
    {
      section: "#new-projects-section",
      grid: "#dynamicProjectGrid"
    },
    {
      section: "#new-webinars-section",
      grid: "#dynamicWebinarGrid"
    },
    {
      section: "#new-volunteering-section",
      grid: "#dynamicVolunteeringGrid"
    },
    {
      section: "#new-internship-section",
      grid: "#dynamicInternshipGrid"
    }
  ];

  sections.forEach((item) => {
    const section =
      document.querySelector(item.section);

    const grid =
      document.querySelector(item.grid);

    if (!section || !grid) {
      return;
    }

    if (!grid.children.length) {
      section.style.display = "none";
    }
  });
}

/* =========================================================
   SECURITY HELPER
   ========================================================= */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

function initializeActiveNavigation() {
  const sections = document.querySelectorAll(
    "section[id]"
  );

  const links = document.querySelectorAll(
    '.navbar-links a[href^="#"]'
  );

  if (!sections.length || !links.length) {
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        links.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink = document.querySelector(
          `.navbar-links a[href="#${entry.target.id}"]`
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }
      });
    },
    {
      threshold: 0.45
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

initializeActiveNavigation();
