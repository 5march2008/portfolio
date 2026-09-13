/* =========================================
   HUB OF TOMORROW — BIOLAB
   INTERACTIONS
========================================= */


/* ABOUT BIOLAB MODAL */

const aboutLabBtn = document.getElementById("aboutLabBtn");
const aboutModal = document.getElementById("aboutModal");
const closeModal = document.getElementById("closeModal");


aboutLabBtn.addEventListener("click", function () {
    aboutModal.classList.add("active");
});


closeModal.addEventListener("click", function () {
    aboutModal.classList.remove("active");
});


/* CLOSE MODAL WHEN CLICKING OUTSIDE */

aboutModal.addEventListener("click", function (event) {

    if (event.target === aboutModal) {
        aboutModal.classList.remove("active");
    }

});


/* =========================================
   PARTICLE SYSTEM
========================================= */

const particlesContainer =
    document.getElementById("particles");


for (let i = 0; i < 45; i++) {

    const particle =
        document.createElement("span");


    particle.style.position = "absolute";


    particle.style.width =
        Math.random() * 3 + 1 + "px";


    particle.style.height =
        particle.style.width;


    particle.style.borderRadius =
        "50%";


    particle.style.background =
        i % 3 === 0
            ? "#43f5a5"
            : "#00e5ff";


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        Math.random() * 100 + "%";


    particle.style.opacity =
        Math.random() * 0.6 + 0.15;


    particle.style.boxShadow =
        "0 0 10px currentColor";


    particle.style.animation =
        `particleFloat ${
            Math.random() * 8 + 5
        }s ease-in-out infinite`;


    particle.style.animationDelay =
        Math.random() * -10 + "s";


    particlesContainer.appendChild(particle);

}