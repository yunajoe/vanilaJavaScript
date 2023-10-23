let cnt = 0;
let value = document.querySelector("#value");
let buttons = document.querySelectorAll(".button");
const changeColor = (number, value) => {
  if (number > 0) {
    value.style.color = "green";
  } else if (number < 0) {
    value.style.color = "red";
  } else if (number === 0) {
    value.style.color = "blue";
  }
};

buttons.forEach((button) => {
  let each = button.classList; // each는 DOMTOKENLIST
  if (each.contains("decrease")) {
    button.addEventListener("click", function (e) {
      cnt--;
      value.textContent = cnt;
      changeColor(cnt, value);
    });
  } else if (each.contains("reset")) {
    button.addEventListener("click", function (e) {
      cnt = 0;
      value.textContent = cnt;
      changeColor(cnt, value);
    });
  } else if (each.contains("increase")) {
    button.addEventListener("click", function (e) {
      cnt++;
      value.textContent = cnt;
      changeColor(cnt, value);
    });
  }
});
