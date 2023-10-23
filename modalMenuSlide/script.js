const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

// 나는야 토글버튼
toggle.addEventListener("click", (e) => {
  document.body.classList.toggle("show-nav");
});

// sign-up 버튼
open.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

// 모달에서 X , close버튼
close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// Hide modal on outside click
// 꼭 모달창에서 클로즈 버튼을 안 눌르더라도, 즉, 아무 영역에서 클릭하더라두 모달창에서 close해주기
window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});
