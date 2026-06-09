const body = document.body;
const cards = Array.from(document.querySelectorAll(".project-card"));
const idCards = Array.from(document.querySelectorAll(".id-card"));
const idCardStack = document.querySelector(".id-card-stack");
const allWorksLink = document.querySelector("#all-works-link");

function setMode(mode) {
  body.classList.remove("design-mode", "art-mode", "all-works-mode");
  body.classList.add(`${mode}-mode`);

  idCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.mode === mode);
  });

  cards.forEach((card) => {
    const shouldShow = mode === "all-works" || card.dataset.group === mode;
    card.hidden = !shouldShow;
  });
}

idCards.forEach((card) => {
  card.addEventListener("click", () => setMode(card.dataset.mode));
});

idCardStack.addEventListener("click", (event) => {
  const stackRect = idCardStack.getBoundingClientRect();
  const clickedRightSide = event.clientX > stackRect.left + stackRect.width * 0.5;

  if (clickedRightSide) {
    setMode("art");
  }
});

allWorksLink.addEventListener("click", (event) => {
  event.preventDefault();
  setMode("all-works");
  history.pushState(null, "", "index.html?view=all#works");
  document.querySelector("#works").scrollIntoView({ behavior: "smooth" });
});

const initialMode = new URLSearchParams(window.location.search).get("view") === "all"
  ? "all-works"
  : "design";

setMode(initialMode);
