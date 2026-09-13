/* =====================================================
   MICROBE DETECTIVE
   Hub Of Tomorrow | BioLab
===================================================== */

const cases = [
    {
        code: "MD-001",
        title: "Case 01 of 04",
        sampleType: "BACTERIAL SAMPLE",

        description:
            "A rod-shaped microorganism was collected from a moist environment. Examine its structure and behavior.",

        correctAnswer: "bacteria",

        clues: [
            {
                icon: "📏",
                title: "Cell Shape",
                short: "Rod-shaped",
                detail:
                    "The specimen has a rod-like shape. Rod-shaped bacteria are commonly called bacilli."
            },
            {
                icon: "🧱",
                title: "Cell Wall",
                short: "Peptidoglycan wall",
                detail:
                    "The cell has a protective wall containing peptidoglycan, a major feature of bacterial cells."
            },
            {
                icon: "🧪",
                title: "Gram Stain",
                short: "Gram-positive",
                detail:
                    "The sample retains the primary stain and appears purple, suggesting a thick peptidoglycan layer."
            },
            {
                icon: "🌬️",
                title: "Oxygen Need",
                short: "Facultative anaerobe",
                detail:
                    "The organism can survive when oxygen is present or absent. This is called facultative anaerobic behavior."
            },
            {
                icon: "🏃",
                title: "Movement",
                short: "Motile",
                detail:
                    "The specimen can move using a flagellum-like structure."
            },
            {
                icon: "🔍",
                title: "Cell Nucleus",
                short: "No true nucleus",
                detail:
                    "The genetic material is not enclosed inside a membrane-bound nucleus. This is typical of prokaryotes."
            },
            {
                icon: "🌱",
                title: "Habitat",
                short: "Soil and water",
                detail:
                    "The microorganism was found in soil and freshwater. Bacteria can live in many different environments."
            },
            {
                icon: "➗",
                title: "Reproduction",
                short: "Binary fission",
                detail:
                    "The cell reproduces by dividing into two daughter cells. This process is called binary fission."
            }
        ]
    },

    {
        code: "MD-002",
        title: "Case 02 of 04",
        sampleType: "FUNGAL SAMPLE",

        description:
            "This specimen was collected from a sugary food source. Its growth pattern may reveal its identity.",

        correctAnswer: "yeast",

        clues: [
            {
                icon: "🟠",
                title: "Cell Shape",
                short: "Oval-shaped",
                detail:
                    "The cells are mostly oval or round rather than long and rod-shaped."
            },
            {
                icon: "🧱",
                title: "Cell Wall",
                short: "Chitin and glucans",
                detail:
                    "The cell wall contains fungal materials such as chitin and glucans."
            },
            {
                icon: "🧬",
                title: "Cell Type",
                short: "Eukaryotic",
                detail:
                    "The organism has a true nucleus surrounded by a nuclear membrane."
            },
            {
                icon: "🍬",
                title: "Food Source",
                short: "Sugars",
                detail:
                    "The organism uses sugars as an energy source and can produce carbon dioxide during fermentation."
            },
            {
                icon: "🌱",
                title: "Habitat",
                short: "Fruit and dough",
                detail:
                    "The specimen was found around fruit surfaces and fermenting dough."
            },
            {
                icon: "🌬️",
                title: "Oxygen Need",
                short: "Can ferment",
                detail:
                    "The organism can produce energy through fermentation when oxygen is limited."
            },
            {
                icon: "🌿",
                title: "Cell Structure",
                short: "Single-celled fungus",
                detail:
                    "Unlike many fungi, this organism usually exists as individual cells."
            },
            {
                icon: "🌱",
                title: "Reproduction",
                short: "Budding",
                detail:
                    "A smaller daughter cell grows from the parent cell. This process is called budding."
            }
        ]
    },

    {
        code: "MD-003",
        title: "Case 03 of 04",
        sampleType: "PROTOZOAN SAMPLE",

        description:
            "The specimen was collected from pond water. Its movement and feeding behavior are important clues.",

        correctAnswer: "protozoan",

        clues: [
            {
                icon: "🫧",
                title: "Cell Shape",
                short: "Flexible shape",
                detail:
                    "The organism has a flexible body shape that can change as it moves."
            },
            {
                icon: "🔬",
                title: "Cell Type",
                short: "Eukaryotic",
                detail:
                    "The specimen contains a true nucleus and other membrane-bound organelles."
            },
            {
                icon: "🏃",
                title: "Movement",
                short: "Pseudopodia",
                detail:
                    "The organism moves using temporary extensions of its cell membrane called pseudopodia."
            },
            {
                icon: "🍽️",
                title: "Feeding",
                short: "Engulfs food",
                detail:
                    "The organism surrounds and takes in food particles through a process called phagocytosis."
            },
            {
                icon: "💧",
                title: "Habitat",
                short: "Freshwater pond",
                detail:
                    "The sample came from freshwater, where many protozoans live."
            },
            {
                icon: "🧬",
                title: "Cell Organization",
                short: "Single cell",
                detail:
                    "One cell performs all major life functions, including movement, feeding, and reproduction."
            },
            {
                icon: "🫙",
                title: "Food Vacuoles",
                short: "Present",
                detail:
                    "Food particles can be enclosed in food vacuoles for digestion."
            },
            {
                icon: "➗",
                title: "Reproduction",
                short: "Cell division",
                detail:
                    "Many protozoans reproduce asexually through cell division."
            }
        ]
    },

    {
        code: "MD-004",
        title: "Case 04 of 04",
        sampleType: "PHOTOSYNTHETIC SAMPLE",

        description:
            "The specimen was found in a sunlit water source. Its ability to capture light provides a major clue.",

        correctAnswer: "algae",

        clues: [
            {
                icon: "🌿",
                title: "Color",
                short: "Green pigment",
                detail:
                    "The organism contains green pigments that help it capture light energy."
            },
            {
                icon: "☀️",
                title: "Energy Source",
                short: "Sunlight",
                detail:
                    "The specimen uses light energy to produce chemical energy through photosynthesis."
            },
            {
                icon: "🧬",
                title: "Cell Type",
                short: "Eukaryotic",
                detail:
                    "The organism has a true nucleus and membrane-bound cell structures."
            },
            {
                icon: "💧",
                title: "Habitat",
                short: "Pond water",
                detail:
                    "The specimen was collected from a sunlit freshwater environment."
            },
            {
                icon: "🍃",
                title: "Chloroplasts",
                short: "Present",
                detail:
                    "Chloroplasts contain pigments used in photosynthesis."
            },
            {
                icon: "🫧",
                title: "Gas Exchange",
                short: "Releases oxygen",
                detail:
                    "During photosynthesis, the organism can release oxygen as a by-product."
            },
            {
                icon: "🔬",
                title: "Organization",
                short: "Microscopic cell",
                detail:
                    "This specimen is a microscopic photosynthetic organism."
            },
            {
                icon: "🌱",
                title: "Nutrition",
                short: "Autotrophic",
                detail:
                    "The organism produces much of its own food using light energy."
            }
        ]
    }
];

let currentCaseIndex = 0;
let examinedClues = new Set();
let selectedAnswer = null;
let caseCompleted = false;

const progressTitle = document.getElementById("progressTitle");
const progressCounter = document.getElementById("progressCounter");
const progressBar = document.getElementById("progressBar");

const specimenCode = document.getElementById("specimenCode");
const sampleType = document.getElementById("sampleType");
const specimenDescription = document.getElementById("specimenDescription");

const clueGrid = document.getElementById("clueGrid");
const clueResult = document.getElementById("clueResult");
const evidenceCount = document.getElementById("evidenceCount");

const answerGrid = document.getElementById("answerGrid");
const answerButtons = document.querySelectorAll(".answer-option");

const feedbackBox = document.getElementById("feedbackBox");
const resetButton = document.getElementById("resetButton");
const nextButton = document.getElementById("nextButton");

/* =====================================================
   INITIALIZE
===================================================== */

function initializeCase() {
    const currentCase = cases[currentCaseIndex];

    examinedClues = new Set();
    selectedAnswer = null;
    caseCompleted = false;

    progressTitle.textContent = currentCase.title;
    progressCounter.textContent = "0 / 8 clues examined";
    progressBar.style.width = "0%";

    specimenCode.textContent = currentCase.code;
    sampleType.textContent = currentCase.sampleType;
    specimenDescription.textContent = currentCase.description;

    evidenceCount.textContent = `${currentCase.clues.length} clues`;

    clueResult.textContent =
        "Select a clue to examine the specimen.";

    feedbackBox.className = "feedback-box";
    feedbackBox.textContent =
        "Your laboratory report will appear here.";

    nextButton.disabled = true;
    nextButton.textContent =
        currentCaseIndex === cases.length - 1
            ? "Finish Investigation →"
            : "Next Case →";

    answerButtons.forEach((button) => {
        button.classList.remove("selected", "correct", "incorrect");
        button.disabled = false;
    });

    renderClues();
}

/* =====================================================
   RENDER CLUES
===================================================== */

function renderClues() {
    const currentCase = cases[currentCaseIndex];

    clueGrid.innerHTML = "";

    currentCase.clues.forEach((clue, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "clue-button";
        button.dataset.index = index;

        button.innerHTML = `
            <div class="clue-top">
                <span class="clue-icon">${clue.icon}</span>
                <span class="clue-number">CLUE ${String(index + 1).padStart(2, "0")}</span>
            </div>

            <div>
                <strong>${clue.title}</strong>
                <small>${clue.short}</small>
            </div>
        `;

        button.addEventListener("click", () => examineClue(index));

        clueGrid.appendChild(button);
    });
}

/* =====================================================
   EXAMINE CLUE
===================================================== */

function examineClue(index) {
    const currentCase = cases[currentCaseIndex];
    const clue = currentCase.clues[index];

    examinedClues.add(index);

    const selectedClueButton = clueGrid.querySelector(
        `[data-index="${index}"]`
    );

    if (selectedClueButton) {
        selectedClueButton.classList.add("examined");
    }

    clueResult.innerHTML = `
        <strong>${clue.title}:</strong>
        ${clue.detail}
    `;

    const examinedCount = examinedClues.size;
    const totalClues = currentCase.clues.length;
    const progressPercentage = (examinedCount / totalClues) * 100;

    progressCounter.textContent =
        `${examinedCount} / ${totalClues} clues examined`;

    progressBar.style.width = `${progressPercentage}%`;
}

/* =====================================================
   ANSWER SELECTION
===================================================== */

answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (caseCompleted) {
            return;
        }

        selectedAnswer = button.dataset.answer;

        answerButtons.forEach((option) => {
            option.classList.remove("selected");
        });

        button.classList.add("selected");

        checkAnswer();
    });
});

/* =====================================================
   CHECK ANSWER
===================================================== */

function checkAnswer() {
    const currentCase = cases[currentCaseIndex];

    if (!selectedAnswer) {
        return;
    }

    if (selectedAnswer === currentCase.correctAnswer) {
        caseCompleted = true;

        feedbackBox.className = "feedback-box success";

        feedbackBox.innerHTML = `
            <strong>✓ Correct identification!</strong>
            You identified the specimen as
            <strong>${getAnswerName(currentCase.correctAnswer)}</strong>.
            You may continue to the next case.
        `;

        answerButtons.forEach((button) => {
            button.disabled = true;

            if (button.dataset.answer === selectedAnswer) {
                button.classList.add("correct");
            }
        });

        nextButton.disabled = false;
    } else {
        feedbackBox.className = "feedback-box error";

        feedbackBox.innerHTML = `
            <strong>Not quite.</strong>
            Review more clues about the specimen's cell structure,
            nutrition, habitat, and reproduction, then try again.
        `;

        answerButtons.forEach((button) => {
            if (button.dataset.answer === selectedAnswer) {
                button.classList.add("incorrect");
            }
        });
    }
}

/* =====================================================
   ANSWER LABEL
===================================================== */

function getAnswerName(answer) {
    const names = {
        bacteria: "Bacterium",
        yeast: "Yeast",
        protozoan: "Protozoan",
        algae: "Microalga"
    };

    return names[answer] || answer;
}

/* =====================================================
   NEXT CASE
===================================================== */

nextButton.addEventListener("click", () => {
    if (!caseCompleted) {
        return;
    }

    if (currentCaseIndex < cases.length - 1) {
        currentCaseIndex++;
        initializeCase();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }

    showFinalReport();
});

/* =====================================================
   FINAL REPORT
===================================================== */

function showFinalReport() {
    progressTitle.textContent = "Investigation Complete";
    progressCounter.textContent = "4 / 4 cases solved";
    progressBar.style.width = "100%";

    clueGrid.innerHTML = `
        <div class="clue-result" style="grid-column: 1 / -1;">
            <strong>All cases completed.</strong><br>
            You successfully investigated four different types
            of microorganisms.
        </div>
    `;

    clueResult.innerHTML = `
        <strong>Laboratory mission accomplished.</strong>
        Your investigation included bacterial, fungal,
        protozoan, and photosynthetic specimens.
    `;

    specimenCode.textContent = "REPORT COMPLETE";
    sampleType.textContent = "ALL SAMPLES ANALYZED";

    specimenDescription.textContent =
        "You completed the Microbe Detective investigation and compared several important microbial characteristics.";

    answerGrid.innerHTML = `
        <div class="clue-result" style="grid-column: 1 / -1;">
            <strong>Final scientific lesson:</strong><br>
            Microorganisms differ in cell structure, nutrition,
            movement, reproduction, and habitat. Scientists use
            multiple pieces of evidence to identify them.
        </div>
    `;

    feedbackBox.className = "feedback-box success";

    feedbackBox.innerHTML = `
        <strong>🏆 Excellent work, Detective!</strong>
        You completed all four microbial investigations.
    `;

    nextButton.disabled = true;
    nextButton.textContent = "Investigation Completed";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =====================================================
   RESET
===================================================== */

resetButton.addEventListener("click", () => {
    currentCaseIndex = 0;
    initializeCase();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* =====================================================
   START
===================================================== */

initializeCase();