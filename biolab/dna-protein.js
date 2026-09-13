/* =====================================================
   DNA TO PROTEIN TRANSLATOR
   HUB OF TOMORROW • BIOLAB TOOL 02
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const proteinInput = document.getElementById("proteinInput");

const translateBtn = document.getElementById("translateBtn");
const proteinSampleBtn = document.getElementById("proteinSampleBtn");
const proteinClearBtn = document.getElementById("proteinClearBtn");

const proteinInputCount = document.getElementById("proteinInputCount");
const proteinError = document.getElementById("proteinError");

const dnaOutput = document.getElementById("dnaOutput");
const mrnaOutput = document.getElementById("mrnaOutput");
const codonOutput = document.getElementById("codonOutput");
const proteinOutput = document.getElementById("proteinOutput");


/* =====================================================
   GENETIC CODE TABLE
===================================================== */

const geneticCode = {
    UUU: "Phe",
    UUC: "Phe",
    UUA: "Leu",
    UUG: "Leu",

    UCU: "Ser",
    UCC: "Ser",
    UCA: "Ser",
    UCG: "Ser",

    UAU: "Tyr",
    UAC: "Tyr",
    UAA: "STOP",
    UAG: "STOP",

    UGU: "Cys",
    UGC: "Cys",
    UGA: "STOP",
    UGG: "Trp",

    CUU: "Leu",
    CUC: "Leu",
    CUA: "Leu",
    CUG: "Leu",

    CCU: "Pro",
    CCC: "Pro",
    CCA: "Pro",
    CCG: "Pro",

    CAU: "His",
    CAC: "His",
    CAA: "Gln",
    CAG: "Gln",

    CGU: "Arg",
    CGC: "Arg",
    CGA: "Arg",
    CGG: "Arg",

    AUU: "Ile",
    AUC: "Ile",
    AUA: "Ile",
    AUG: "Met",

    ACU: "Thr",
    ACC: "Thr",
    ACA: "Thr",
    ACG: "Thr",

    AAU: "Asn",
    AAC: "Asn",
    AAA: "Lys",
    AAG: "Lys",

    AGU: "Ser",
    AGC: "Ser",
    AGA: "Arg",
    AGG: "Arg",

    GUU: "Val",
    GUC: "Val",
    GUA: "Val",
    GUG: "Val",

    GCU: "Ala",
    GCC: "Ala",
    GCA: "Ala",
    GCG: "Ala",

    GAU: "Asp",
    GAC: "Asp",
    GAA: "Glu",
    GAG: "Glu",

    GGU: "Gly",
    GGC: "Gly",
    GGA: "Gly",
    GGG: "Gly"
};


/* =====================================================
   CLEAN DNA
===================================================== */

function cleanDNA(sequence) {
    return sequence
        .toUpperCase()
        .replace(/\s/g, "");
}


/* =====================================================
   INPUT COUNTER
===================================================== */

proteinInput.addEventListener("input", function () {
    const sequence = cleanDNA(proteinInput.value);

    proteinInputCount.textContent =
        `${sequence.length} bases`;
});


/* =====================================================
   DNA TO mRNA
===================================================== */

function dnaToMrna(dna) {
    return dna.replace(/T/g, "U");
}


/* =====================================================
   SPLIT INTO CODONS
===================================================== */

function splitIntoCodons(sequence) {
    const codons = [];

    for (let i = 0; i + 2 < sequence.length; i += 3) {
        codons.push(sequence.substring(i, i + 3));
    }

    return codons;
}


/* =====================================================
   TRANSLATE mRNA TO PROTEIN
===================================================== */

function translateMrna(mrna) {
    const codons = splitIntoCodons(mrna);
    const aminoAcids = [];

    for (let i = 0; i < codons.length; i++) {
        const codon = codons[i];
        const aminoAcid = geneticCode[codon];

        if (aminoAcid) {
            aminoAcids.push(aminoAcid);
        }
    }

    return aminoAcids;
}


/* =====================================================
   TRANSLATE DNA
===================================================== */

function translateDNA() {
    const originalDNA = proteinInput.value.trim();

    if (originalDNA === "") {
        proteinError.textContent =
            "Please enter a DNA sequence first.";

        return;
    }

    const dna = cleanDNA(originalDNA);

    if (!/^[ATGC]+$/.test(dna)) {
        proteinError.textContent =
            "Invalid DNA sequence. Use only A, T, G, and C.";

        return;
    }

    if (dna.length < 3) {
        proteinError.textContent =
            "Please enter at least 3 DNA bases.";

        return;
    }

    const mrna = dnaToMrna(dna);
    const codons = splitIntoCodons(mrna);
    const aminoAcids = translateMrna(mrna);

    const unusedBases = dna.length % 3;

    proteinError.textContent =
        unusedBases === 0
            ? "Translation completed successfully."
            : `Translation completed. ${unusedBases} base(s) at the end were not translated.`;


    dnaOutput.textContent = dna;

    mrnaOutput.textContent = mrna;

    codonOutput.textContent =
        codons.length > 0
            ? codons.join(" • ")
            : "No complete codons found.";

    proteinOutput.textContent =
        aminoAcids.length > 0
            ? aminoAcids.join(" — ")
            : "No amino acids translated.";
}


/* =====================================================
   LOAD SAMPLE
===================================================== */

function loadProteinSample() {
    proteinInput.value =
        "ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG";

    proteinInputCount.textContent =
        `${proteinInput.value.length} bases`;

    proteinError.textContent =
        "Sample DNA loaded. Click Translate DNA.";

    proteinInput.focus();
}


/* =====================================================
   CLEAR
===================================================== */

function clearProtein() {
    proteinInput.value = "";

    proteinInputCount.textContent = "0 bases";
    proteinError.textContent = "";

    dnaOutput.textContent = "—";
    mrnaOutput.textContent = "—";
    codonOutput.textContent = "—";
    proteinOutput.textContent = "—";
}


/* =====================================================
   BUTTON EVENTS
===================================================== */

translateBtn.addEventListener("click", translateDNA);

proteinSampleBtn.addEventListener("click", loadProteinSample);

proteinClearBtn.addEventListener("click", clearProtein);