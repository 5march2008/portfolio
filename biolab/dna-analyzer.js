/* =====================================================
   DNA ANALYZER — FUNCTIONAL JAVASCRIPT
===================================================== */

const dnaInput = document.getElementById("dnaInput");

const analyzeBtn = document.getElementById("analyzeBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");

const inputCount = document.getElementById("inputCount");
const errorMessage = document.getElementById("errorMessage");

const lengthResult = document.getElementById("lengthResult");
const gcResult = document.getElementById("gcResult");
const atResult = document.getElementById("atResult");
const baseResult = document.getElementById("baseResult");

const aCount = document.getElementById("aCount");
const tCount = document.getElementById("tCount");
const gCount = document.getElementById("gCount");
const cCount = document.getElementById("cCount");

const aBar = document.getElementById("aBar");
const tBar = document.getElementById("tBar");
const gBar = document.getElementById("gBar");
const cBar = document.getElementById("cBar");

const originalResult = document.getElementById("originalResult");
const complementResult = document.getElementById("complementResult");
const reverseResult = document.getElementById("reverseResult");
const rnaResult = document.getElementById("rnaResult");

const resultsSection = document.getElementById("resultsSection");


/* =====================================================
   CLEAN DNA SEQUENCE
===================================================== */

function cleanDNA(sequence) {
    return sequence
        .toUpperCase()
        .replace(/\s/g, "");
}


/* =====================================================
   UPDATE INPUT COUNT
===================================================== */

dnaInput.addEventListener("input", function () {
    const sequence = cleanDNA(dnaInput.value);

    inputCount.textContent = `${sequence.length} bases`;
});


/* =====================================================
   ANALYZE DNA
===================================================== */

function analyzeDNA() {
    const originalSequence = dnaInput.value.trim();

    if (originalSequence === "") {
        errorMessage.textContent = "Please enter a DNA sequence first.";
        return;
    }

    const sequence = cleanDNA(originalSequence);

    const invalidCharacters = sequence.match(/[^ATGC]/g);

    if (invalidCharacters) {
        errorMessage.textContent =
            "Invalid DNA characters found. Please use only A, T, G, and C.";

        return;
    }

    if (sequence.length === 0) {
        errorMessage.textContent =
            "Please enter a valid DNA sequence.";

        return;
    }

    errorMessage.textContent =
        "Analysis completed successfully.";

    const length = sequence.length;

    const a = (sequence.match(/A/g) || []).length;
    const t = (sequence.match(/T/g) || []).length;
    const g = (sequence.match(/G/g) || []).length;
    const c = (sequence.match(/C/g) || []).length;

    const gcPercentage = ((g + c) / length) * 100;
    const atPercentage = ((a + t) / length) * 100;

    const complement = sequence
    .split("")
    .map(base => {
        if (base === "A") return "T";
        if (base === "T") return "A";
        if (base === "G") return "C";
        if (base === "C") return "G";
        return base;
    })
    .join("");
    const reverseComplement = complement
        .split("")
        .reverse()
        .join("");

    const rna = sequence.replace(/T/g, "U");


    /* Results */

    lengthResult.textContent = length;
    gcResult.textContent = `${gcPercentage.toFixed(2)}%`;
    atResult.textContent = `${atPercentage.toFixed(2)}%`;
    baseResult.textContent = "4";

    aCount.textContent = a;
    tCount.textContent = t;
    gCount.textContent = g;
    cCount.textContent = c;

    originalResult.textContent = sequence;
    complementResult.textContent = complement;
    reverseResult.textContent = reverseComplement;
    rnaResult.textContent = rna;


    /* Composition bars */

    aBar.style.width = `${(a / length) * 100}%`;
    tBar.style.width = `${(t / length) * 100}%`;
    gBar.style.width = `${(g / length) * 100}%`;
    cBar.style.width = `${(c / length) * 100}%`;

    resultsSection.style.display = "block";
}


/* =====================================================
   LOAD SAMPLE
===================================================== */

function loadSample() {
    dnaInput.value = "ATGCGTACCGTAGCTAGCTA";

    inputCount.textContent =
        `${dnaInput.value.length} bases`;

    errorMessage.textContent =
        "Sample DNA loaded. Click Analyze Sequence.";

    dnaInput.focus();
}


/* =====================================================
   CLEAR EVERYTHING
===================================================== */

function clearDNA() {
    dnaInput.value = "";

    inputCount.textContent = "0 bases";
    errorMessage.textContent = "";

    lengthResult.textContent = "0";
    gcResult.textContent = "0%";
    atResult.textContent = "0%";
    baseResult.textContent = "4";

    aCount.textContent = "0";
    tCount.textContent = "0";
    gCount.textContent = "0";
    cCount.textContent = "0";

    aBar.style.width = "0%";
    tBar.style.width = "0%";
    gBar.style.width = "0%";
    cBar.style.width = "0%";

    originalResult.textContent = "—";
    complementResult.textContent = "—";
    reverseResult.textContent = "—";
    rnaResult.textContent = "—";
}


/* =====================================================
   BUTTON EVENTS
===================================================== */

analyzeBtn.addEventListener("click", analyzeDNA);
sampleBtn.addEventListener("click", loadSample);
clearBtn.addEventListener("click", clearDNA);