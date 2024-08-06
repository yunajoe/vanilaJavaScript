const person = document.querySelector(".person");
const wealth = document.querySelector(".wealth");
const container = document.querySelector(".container");

// 버튼
const addUserButton = document.querySelector(".add-user");
const deleteButton = document.querySelector(".delete-user");
const doubleMoneyButton = document.querySelector(".double-money");
const millionsButton = document.querySelector(".millions");
const sortByRichestButton = document.querySelector(".sort-richest");
const calculateButton = document.querySelector(".calculate");
const filterButton = document.querySelector(".filter-by-select");

// select
const selectMenu = document.getElementById("main-select");
const subMenu = document.getElementById("sub-select");

// select 메뉴 초기
let selectInitValue = selectMenu.value;
let subInitValue;
async function infoFetch() {
  const response = await fetch(" https://randomuser.me/api");
  if (response.status === 200) {
    const jsonData = await response.json();
    const results = jsonData.results;
    const person = results[0];
    return person;
  }
}

function deletePerson() {
  let removedIdx = [];
  const profiles = document.querySelectorAll(".profile");
  [...profiles].forEach((ele, idx) => {
    const input = ele.querySelector("input");
    if (input.checked) {
      removedIdx.push(idx);
    }
  });

  const profilesArr = document.querySelectorAll(".profile");
  const personMoneyArr = document.querySelectorAll(".money");
  removedIdx.forEach((checkedIdx) => {
    [...profilesArr].filter((ele, idx) => {
      if (checkedIdx === idx) {
        ele.remove();
      }
    });
  });
  removedIdx.forEach((checkedIdx) => {
    [...personMoneyArr].filter((ele, idx) => {
      if (checkedIdx === idx) {
        ele.remove();
      }
    });
  });
}
function addPerson() {
  infoFetch().then((info) => {
    let fullName = info.name.last + " " + info.name.first;
    let gender = info.gender; // 성별
    let registerData = new Date(info.registered.date);
    registerData =
      registerData.getFullYear() + "년도 " + registerData.getMonth() + "월";

    const individual = document.createElement("p");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", fullName);

    individual.classList.add("profile");
    individual.innerHTML =
      "name: " +
      fullName +
      "<hr>" +
      "gender: " +
      gender +
      "<hr>" +
      "registerDate: " +
      registerData;
    person.append(individual);
    individual.prepend(input);
    const money = Math.floor(Math.random() * 1000000).toLocaleString();
    const individualMoney = document.createElement("p");
    individualMoney.classList.add("money");

    individualMoney.textContent = "$" + money;
    wealth.append(individualMoney);
  });
}

function StringToNumber(element) {
  let money = Number(element.innerText.replace("$", "").split(",").join(""));
  return money;
}

// 돈 2배로 만드는 함수
// 선택한 사람만 가능하게 함
function doubleMoney(personIdx) {
  const targetMoney = document.querySelectorAll(".money");
  [...targetMoney].forEach((money, moneyIdx) => {
    if (moneyIdx === personIdx) {
      let doubledMoney = StringToNumber(money) * 2;
      doubledMoney = "$" + doubledMoney.toLocaleString();
      money.textContent = doubledMoney;
    }
  });
}

function removeOnlyNodeElement(parentNode) {
  // childNodes는 noList를 반한하는 것이고, children은 httmlcolection을 반환하는 것인데. children은 undefined나온다
  const childNodes = parentNode.childNodes;
  const childArray = [...childNodes];
  childArray.forEach((ele, idx) => {
    if (idx !== 0) {
      ele.remove();
    }
  });
}

//  million 이상만 보여주기(1,000,000)
function showMilions() {
  const person = document.querySelector(".person");
  const wealth = document.querySelector(".wealth");

  // chilren하면은 httmlcollection으로 뽑힘. 즉, textNode는 X
  const moneyArr = [...wealth.children];
  const filteredMoneyArr = moneyArr.filter(
    (money) => StringToNumber(money) > 1000000
  ); // array

  let moneyArrIdx = moneyArr
    .map((money, idx) => {
      if (filteredMoneyArr.indexOf(money) !== -1) {
        return idx;
      }
    })
    .filter((val) => val !== undefined);

  const profilesArr = document.querySelectorAll(".profile");
  const personMoneyArr = document.querySelectorAll(".money");

  removeOnlyNodeElement(person);
  removeOnlyNodeElement(wealth);

  moneyArrIdx.forEach((moneyIdx) => {
    [...profilesArr].filter((ele, idx) => {
      if (moneyIdx === idx) {
        person.appendChild(ele);
      }
    });
  });

  moneyArrIdx.forEach((moneyIdx) => {
    [...personMoneyArr].filter((ele, idx) => {
      if (moneyIdx === idx) {
        wealth.appendChild(ele);
      }
    });
  });
}

function sortByRichest() {
  const moneyArr = document.querySelectorAll(".money");
  const result = [...moneyArr].map((ele, idx) => {
    let nums = StringToNumber(ele);
    return [nums, idx];
  });
  result.sort((a, b) => b[0] - a[0]);

  let sortedIdxResult = result.map((ele) => {
    let [_, idx] = ele;
    return idx;
  });

  const profilesArr = document.querySelectorAll(".profile");
  const personMoneyArr = document.querySelectorAll(".money");
  removeOnlyNodeElement(person);
  removeOnlyNodeElement(wealth);
  sortedIdxResult.forEach((targetIdx) => {
    [...profilesArr].filter((ele, idx) => {
      if (targetIdx === idx) {
        person.appendChild(ele);
      }
    });
  });
  sortedIdxResult.forEach((targetIdx) => {
    [...personMoneyArr].filter((ele, idx) => {
      if (targetIdx === idx) {
        wealth.appendChild(ele);
      }
    });
  });
}

function calculateMoney(personIdx) {
  const moneyArr = document.querySelectorAll(".money");
  const result = [...moneyArr].reduce((acc, ele, moneyIdx) => {
    if (moneyIdx === personIdx) {
      let num = StringToNumber(ele);
      acc += num;
    }
    return acc;
  }, 0);
  let calResult = "$" + result.toLocaleString();
  let children = [...container.children];
  children.forEach((ele) => {
    if (ele.classList.contains("cal-result")) {
      ele.remove();
    }
  });
  let calsum = document.createElement("p");
  calsum.classList.add("cal-result");
  calsum.textContent = "Total Result: " + calResult;
  container.appendChild(calsum);
}

function showCategory(option) {
  let gender = ["female", "male"];
  let date = ["2001~2005", "2006~2010", "2011~2015", "2016~2020"];
  let str = "choose option";
  let items;

  if (option === "gender") {
    items = gender;
  } else if (option === "date") {
    items = date;
  }

  if (option === "gender" || option === "date") {
    [...items].forEach((item) => {
      let option = document.createElement("option");
      option.textContent = item;
      subMenu.appendChild(option);
    });
    return;
  }
  if (option === "default") {
    let option = document.createElement("option");
    option.textContent = str;
    subMenu.appendChild(option);
    return;
  }
}

addUserButton.addEventListener("click", addPerson);
deleteButton.addEventListener("click", deletePerson);
doubleMoneyButton.addEventListener("click", () => {
  const profilesArr = document.querySelectorAll(".profile");
  [...profilesArr].forEach((person, personIdx) => {
    const input = person.querySelector("input");
    if (input.checked) {
      doubleMoney(personIdx);
    }
  });
});

millionsButton.addEventListener("click", showMilions);
sortByRichestButton.addEventListener("click", sortByRichest);
calculateButton.addEventListener("click", () => {
  const profilesArr = document.querySelectorAll(".profile");
  [...profilesArr].forEach((person, personIdx) => {
    const input = person.querySelector("input");
    if (input.checked) {
      calculateMoney(personIdx);
    }
  });
});

selectMenu.addEventListener("change", (e) => {
  subMenu.innerHTML = "";
  selectInitValue = selectMenu.value;
  if (selectInitValue === "gender") {
    subInitValue = "female";
  } else if (selectInitValue === "date") {
    subInitValue = "2001~2005";
  }
  showCategory(selectInitValue);
});

subMenu.addEventListener("change", (e) => {
  let select = e.target;
  let options = select.querySelectorAll("option");
  let idx = e.target.selectedIndex;
  subInitValue = options[idx].text;
});

// gender select메뉴일때
const genderCleanText = (ele) => {
  const regex = /.+(:)/;
  let str = ele.innerHTML.split("hr")[1];
  str = str.replace(regex, "");
  str = str.replace("<", "").trim();
  return str;
};

const dateCleanText = (ele) => {
  const regex = /.+(:)|\년도.*$/g;
  let str = ele.innerHTML.split("hr")[2];
  str = str.replace(regex, "");
  str = str.trim();
  return str;
};

const isInclude = (value, category) => {
  category = category.split("~");
  const [start, end] = category;
  if (value >= start && value <= end) {
    return true;
  }
  return false;
};

filterButton.addEventListener("click", (e) => {
  const removedIdx = [];
  const profilesArr = document.querySelectorAll(".profile");
  const personMoneyArr = document.querySelectorAll(".money");

  [...profilesArr].forEach((ele, idx) => {
    if (selectInitValue === "gender") {
      let str = genderCleanText(ele);
      if (str !== subInitValue) {
        removedIdx.push(idx);
        ele.remove();
      }
    } else if (selectInitValue === "date") {
      let str = dateCleanText(ele);
      if (!isInclude(str, subInitValue)) {
        removedIdx.push(idx);
        ele.remove();
      }
    }
  });
  removedIdx.forEach((idx) => {
    [...personMoneyArr].filter((ele, moneyIdx) => {
      if (idx === moneyIdx) {
        ele.remove();
      }
    });
  });
});
