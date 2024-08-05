/*
steps.. 
1. seat클래스를 선택하면은(클릭하면은) selected클래스를 추가해서 선택된 좌석새깔 변하게 하기 
2. selected추가 된 요소를 count하기, 만약에 selected class가 없다면은 count빼기 
3. 클리한 영화를 유저가 알아보게 할 수 있게 하기 
slected 클래스가 있으면은 해당 영화이름이 나오게?
selected클래스가 없으면 영황이름 없애기
*/
let rows = document.querySelectorAll(".row .seat");
let movieMenus = document.querySelector(".movieTitles");
let count = document.querySelector("#count");
let price = document.querySelector("#price");
let targetMovie = movieMenus.value;
let finalPrice = 0;

let selectedMovie = [];
function calPrice(targetMovie, selectedArr) {
  if (targetMovie === "Avengers") {
    selectedMovie.push(10);
  } else if (targetMovie === "Jokers") {
    selectedMovie.push(12);
  } else if (targetMovie === "Toy") {
    selectedMovie.push(8);
  } else if (targetMovie === "Lion") {
    selectedMovie.push(9);
  }
}

let selectedArr = [];
// occupied가 안된 좌석을 클릭하면은 selected클래스가 toggle되도록 하기!
rows.forEach((row) => {
  row.addEventListener("click", function (event) {
    if (!event.target.classList.contains("occupied")) {
      // 클릭하면은 selected랑 targetMovie의 class이름이 붙는다
      // 두번째 클릭하면은 없어지고 seat만 남음
      event.target.classList.toggle("selected");
    }
    if (event.target.classList.contains("selected")) {
      selectedArr.push(event.target);
      calPrice(targetMovie);
    } else {
      let targetIdx = selectedArr.indexOf(event.target);
      // filter method는 원본을 바꾸지 않는다.
      selectedArr = selectedArr.filter((_, idx) => targetIdx !== idx);
      selectedMovie = selectedMovie.filter((_, idx) => targetIdx !== idx);
      event.target.textContent = "";
    }
    // filter때문에 selected가 없으면은 지워진다
    if (selectedMovie.length !== 0) {
      finalPrice = selectedMovie.reduce((acc, val) => {
        acc += val;
        return acc;
      }, 0);
    } else {
      finalPrice = 0;
    }
    count.textContent = selectedArr.length;
    price.textContent = finalPrice;
  });
});

movieMenus.addEventListener("change", function (e) {
  targetMovie = e.target.value;
  // 아래처럼 하면은 안되는 이유가 change만 하고.. 좌석을 선택하지 않아두 가격이 push가 된다
  // calPrice(targetMovie);
});
