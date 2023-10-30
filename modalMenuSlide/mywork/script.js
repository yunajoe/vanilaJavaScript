const signUpButton = document.querySelector(".modal__button");
const closeButton = document.querySelector(".modal-close");
const modalContainer = document.querySelector(".modal__container");

signUpButton.addEventListener("click", () => {
  modalContainer.classList.add("show-modal");
});

closeButton.addEventListener("click", () => {
  modalContainer.classList.remove("show-modal");
});
