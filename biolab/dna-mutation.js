/* =====================================================
   DNA MUTATION SIMULATOR
   Hub of Tomorrow | BioLab Tool 03
===================================================== */

"use strict";

/* =====================================================
   ELEMENTS
===================================================== */

const originalDnaInput = document.getElementById("originalDna");
const originalLength = document.getElementById("originalLength");
const originalStatus = document.getElementById("originalStatus");

const positionInput = document.getElementById("positionInput");
const baseInput = document.getElementById("baseInput");
const baseLabel = document.getElementById("baseLabel");

const applyMutationButton = document.getElementById(
  "applyMutationButton"
);

const resetButton = document.getElementById("resetButton");

const originalResult = document.getElementById("originalResult");
const mutatedResult = document.getElementById("mutatedResult");

const differenceResult = document.getElementById("differenceResult");
const explanationResult = document.getElementById("explanationResult");

const mutationOptions = document.querySelectorAll(
  ".mutation-option"
);

/* =====================================================
   STATE
===================================================== */

const DEFAULT_SEQUENCE = "ATGGCCTAA";

let selectedMutation = "substitution";
let originalSequence = DEFAULT_SEQUENCE;
let mutatedSequence = DEFAULT_SEQUENCE;

/* =====================================================
   DNA HELPERS
===================================================== */

function cleanDnaSequence(sequence) {
  return String(sequence)
    .toUpperCase()
    .replace(/\s/g, "");
}

function isValidDna(sequence) {
  return sequence.length > 0 && /^[ATCG]+$/.test(sequence);
}

function setStatus(message, color) {
  originalStatus.textContent = message;
  originalStatus.style.color = color;
}

function getPosition() {
  const position = Number(positionInput.value);

  if (!Number.isInteger(position)) {
    return null;
  }

  return position;
}

/* =====================================================
   ORIGINAL DNA INFORMATION
===================================================== */

function updateOriginalInformation() {
  const rawSequence = originalDnaInput.value.toUpperCase();
  const cleanedSequence = cleanDnaSequence(rawSequence);

  originalLength.textContent =
    "Length: " + cleanedSequence.length + " bases";

  if (rawSequence.trim() === "") {
    setStatus("Enter a DNA sequence", "#ff8f9b");
    return;
  }

  if (!isValidDna(cleanedSequence)) {
    setStatus(
      "Use only A, T, C, and G",
      "#ff8f9b"
    );
    return;
  }

  if (rawSequence !== cleanedSequence) {
    setStatus(
      "Spaces removed automatically",
      "#ffd479"
    );
    return;
  }

  setStatus("Valid DNA", "#5be0be");
}

/* =====================================================
   MUTATION TYPE SELECTION
===================================================== */

mutationOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    mutationOptions.forEach(function (item) {
      item.classList.remove("active");
    });

    option.classList.add("active");

    selectedMutation = option.dataset.mutation;

    updateControlsForMutation();
    updateExplanation();
  });
});

/* =====================================================
   UPDATE CONTROLS
===================================================== */

function updateControlsForMutation() {
  const baseControlGroup = baseInput.closest(".control-group");

  if (selectedMutation === "substitution") {
    baseInput.disabled = false;
    baseControlGroup.style.opacity = "1";

    baseLabel.textContent = "New Base";
    applyMutationButton.textContent = "Apply Substitution";
  }

  if (selectedMutation === "insertion") {
    baseInput.disabled = false;
    baseControlGroup.style.opacity = "1";

    baseLabel.textContent = "Inserted Base";
    applyMutationButton.textContent = "Apply Insertion";
  }

  if (selectedMutation === "deletion") {
    baseInput.disabled = true;
    baseControlGroup.style.opacity = "0.45";

    baseLabel.textContent = "New Base Not Required";
    applyMutationButton.textContent = "Apply Deletion";
  }
}

/* =====================================================
   EDUCATIONAL EXPLANATION
===================================================== */

function updateExplanation() {
  if (selectedMutation === "substitution") {
    explanationResult.textContent =
      "A substitution replaces one DNA base with another. " +
      "The total number of bases remains the same.";
  }

  if (selectedMutation === "insertion") {
    explanationResult.textContent =
      "An insertion adds a new DNA base before the selected position. " +
      "In a coding region, an insertion may cause a frameshift.";
  }

  if (selectedMutation === "deletion") {
    explanationResult.textContent =
      "A deletion removes the base at the selected position. " +
      "Removing one base from a coding region may cause a frameshift.";
  }
}

/* =====================================================
   APPLY MUTATION
===================================================== */

applyMutationButton.addEventListener("click", function () {
  const cleanedSequence = cleanDnaSequence(
    originalDnaInput.value
  );

  if (!isValidDna(cleanedSequence)) {
    setStatus(
      "Please enter a valid DNA sequence first",
      "#ff8f9b"
    );

    differenceResult.textContent =
      "Mutation could not be applied. Use only A, T, C, and G.";

    return;
  }

  const position = getPosition();

  if (position === null) {
    differenceResult.textContent =
      "Please enter a whole-number position.";

    return;
  }

  if (
    position < 1 ||
    position > cleanedSequence.length
  ) {
    differenceResult.textContent =
      "Position must be between 1 and " +
      cleanedSequence.length +
      ".";

    return;
  }

  originalSequence = cleanedSequence;

  const index = position - 1;
  const selectedBase = baseInput.value;

  /* SUBSTITUTION */

  if (selectedMutation === "substitution") {
    const oldBase = originalSequence[index];

    if (oldBase === selectedBase) {
      differenceResult.textContent =
        "The selected base is already " +
        selectedBase +
        ". Choose a different base.";

      return;
    }

    mutatedSequence =
      originalSequence.substring(0, index) +
      selectedBase +
      originalSequence.substring(index + 1);

    differenceResult.textContent =
      "Substitution: base " +
      position +
      " changed from " +
      oldBase +
      " to " +
      selectedBase +
      ". Length remains " +
      mutatedSequence.length +
      " bases.";
  }

  /* INSERTION */

  if (selectedMutation === "insertion") {
    mutatedSequence =
      originalSequence.substring(0, index) +
      selectedBase +
      originalSequence.substring(index);

    differenceResult.textContent =
      "Insertion: base " +
      selectedBase +
      " was added before position " +
      position +
      ". Length changed from " +
      originalSequence.length +
      " to " +
      mutatedSequence.length +
      " bases.";
  }

  /* DELETION */

  if (selectedMutation === "deletion") {
    const deletedBase = originalSequence[index];

    mutatedSequence =
      originalSequence.substring(0, index) +
      originalSequence.substring(index + 1);

    differenceResult.textContent =
      "Deletion: base " +
      deletedBase +
      " at position " +
      position +
      " was removed. Length changed from " +
      originalSequence.length +
      " to " +
      mutatedSequence.length +
      " bases.";
  }

  originalResult.textContent = originalSequence;
  mutatedResult.textContent = mutatedSequence;

  updateOriginalInformation();
});

/* =====================================================
   RESET TOOL
===================================================== */

resetButton.addEventListener("click", function () {
  originalDnaInput.value = DEFAULT_SEQUENCE;

  originalSequence = DEFAULT_SEQUENCE;
  mutatedSequence = DEFAULT_SEQUENCE;
  selectedMutation = "substitution";

  positionInput.value = 4;
  positionInput.max = DEFAULT_SEQUENCE.length;

  baseInput.value = "A";

  mutationOptions.forEach(function (option) {
    option.classList.remove("active");
  });

  const substitutionButton = document.querySelector(
    '[data-mutation="substitution"]'
  );

  if (substitutionButton) {
    substitutionButton.classList.add("active");
  }

  originalResult.textContent = DEFAULT_SEQUENCE;
  mutatedResult.textContent = DEFAULT_SEQUENCE;

  differenceResult.textContent =
    "No mutation has been applied yet.";

  updateControlsForMutation();
  updateExplanation();
  updateOriginalInformation();
});

/* =====================================================
   LIVE DNA VALIDATION
===================================================== */

originalDnaInput.addEventListener(
  "input",
  function () {
    updateOriginalInformation();

    const cleanedSequence = cleanDnaSequence(
      originalDnaInput.value
    );

    if (isValidDna(cleanedSequence)) {
      positionInput.max = cleanedSequence.length;

      if (
        Number(positionInput.value) >
        cleanedSequence.length
      ) {
        positionInput.value = cleanedSequence.length;
      }
    }
  }
);

/* =====================================================
   INITIAL SETUP
===================================================== */

positionInput.max = DEFAULT_SEQUENCE.length;

updateControlsForMutation();
updateExplanation();
updateOriginalInformation();