const body = document.body;
const idCards = Array.from(document.querySelectorAll(".id-card"));
const designCard = document.querySelector(".id-card-design");
const artCard = document.querySelector(".id-card-art");
const designAccordion = document.querySelector(".design-accordion");
const artAccordion = document.querySelector(".art-accordion");
const allWorksLink = document.querySelector("#all-works-link");
const worksSection = document.querySelector("#works");

function setBodyMode(mode) {
  body.classList.remove("design-mode", "art-mode", "all-works-mode");

  if (mode === "all") {
    body.classList.add("all-works-mode");
  } else {
    body.classList.add(`${mode}-mode`);
  }
}

function setActiveCard(mode) {
  idCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.mode === mode);
  });
}

function openAccordion(mode) {
  if (mode === "design") {
    if (designAccordion) designAccordion.open = true;
    if (artAccordion) artAccordion.open = false;
  }

  if (mode === "art") {
    if (designAccordion) designAccordion.open = false;
    if (artAccordion) artAccordion.open = true;
  }

  if (mode === "all") {
    if (designAccordion) designAccordion.open = true;
    if (artAccordion) artAccordion.open = true;
  }
}

function setMode(mode, shouldScroll = false) {
  setBodyMode(mode);
  setActiveCard(mode);
  openAccordion(mode);

  if (shouldScroll) {
    const target = mode === "art" ? artAccordion : worksSection;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

designCard?.addEventListener("click", () => {
  history.replaceState(null, "", "index.html?view=design#works");
  setMode("design", true);
});

artCard?.addEventListener("click", () => {
  history.replaceState(null, "", "index.html?view=art#works");
  setMode("art", true);
});

allWorksLink?.addEventListener("click", (event) => {
  event.preventDefault();
  history.replaceState(null, "", "index.html?view=all#works");
  setMode("all", true);
});

designAccordion?.addEventListener("toggle", () => {
  if (designAccordion.open && !artAccordion?.open) {
    setBodyMode("design");
    setActiveCard("design");
  }
});

artAccordion?.addEventListener("toggle", () => {
  if (artAccordion.open) {
    setBodyMode("art");
    setActiveCard("art");
  } else if (designAccordion?.open) {
    setBodyMode("design");
    setActiveCard("design");
  }
});

const params = new URLSearchParams(window.location.search);
const initialView = params.get("view");

if (initialView === "all") {
  setMode("all", window.location.hash === "#works");
} else if (initialView === "art") {
  setMode("art", window.location.hash === "#works");
} else {
  setMode("design", false);
}
