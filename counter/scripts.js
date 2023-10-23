// set initial count
let count = 0;

// select value and buttons
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
  // console.log(btn);<button class="btn decrease">decrease</button>
  btn.addEventListener("click", function (e) {
    //  console.log(e.target);
    // console.log(e.currentTarget.classList); // DOMTokenList(2) ['btn', 'decrease', value: 'btn decrease']
    //  console.log(e.target.classList); // DOMTokenList(2) ['btn', 'decrease', value: 'btn decrease']
    const styles = e.currentTarget.classList;
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else if (styles.contains("reset")) {
      count = 0;
    }
    if (count > 0) {
      value.style.color = "green";
    }
    if (count < 0) {
      value.style.color = "red";
    }
    if (count === 0) {
      value.style.color = "blue";
    }
    value.textContent = count;
  });
});
