const main = document.querySelector("main");

// 버튼
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showmillionairesBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const calculatewealthBtn = document.querySelector("#calculate-wealth");
let data = [];
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  //   console.log(data); results: Array(1), info: {…}}
  const user = data.results[0]; // person's info를 obj형태로 가져옴
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
  // providedData.forEach is not a function at updateDOM
  // updateDOM(data);
  updateDOM();
}

function addData(obj) {
  data.push(obj);
}

// money를 2배늘리기
function doubleMoney() {
  // map은 원본을 안 변경하구 새로운 array를 return하니까 data = data...처럼 해준다
  data = data.map((person) => {
    return { ...person, money: person.money * 2 };
  });
  updateDOM();
}

// order by richest
function sortByRichest() {
  // sort는 원본을 변경시키니까
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// milion이상만 filtering
function showmillionaires() {
  // filter 메서드도 새로운 array를 return하니까 data = ...
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// calculate the wealth
function calculatewealth() {
  const total = data.reduce((acc, user) => {
    acc += user.money;
    return acc;
  }, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Weath: <strong>${formatMoney(
    total
  )}</strong></h3>`;

  main.appendChild(wealthEl);
  /*
    updateDOM();를 하면은 안되는 이유가 updateDOM함수가 초기화시켜주고  array에 담긴 사람의 정보들을 forEach로 돌기떄문이다
   */
}

// 질문>> 왜꼭 data를 다른 변수로 담아서 전달해줘야될까?

// providedData 가 없으면은 data(global)값을 쓰겠다
function updateDOM(providedData = data) {
  // 초기화를 안 시켜주면은
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  providedData.forEach((item) => {
    // console.log(item); obj객체
    const element = document.createElement("div");
    element.classList.add("person");

    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;

    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showmillionairesBtn.addEventListener("click", showmillionaires);
calculatewealthBtn.addEventListener("click", calculatewealth);
