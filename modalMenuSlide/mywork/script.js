const signUpButton = document.querySelector(".modal__button");
const closeButton = document.querySelector(".modal-close");
const modalContainer = document.querySelector(".modal__container");
const toggleButton = document.querySelector(".header__toggle__button");

signUpButton.addEventListener("click", () => {
  modalContainer.classList.add("show-modal");
});

closeButton.addEventListener("click", () => {
  modalContainer.classList.remove("show-modal");
});

function onToggle() {
  const body = document.querySelector("body");
  body.toggleAttribute("show-nav");
}

toggleButton.addEventListener("click", (e) => {
  onToggle();
});
