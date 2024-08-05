// form
const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

let isError = false;
// 숫자이외의 것들을, "" 로 변경
function cleanInputString(str) {
  const regex = /\D+/g;
  return str.replace(regex, "");
}

function isValidInput(str) {
  const regex = /\d+/g;
  return str.match(regex);
}
function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">EntryName ${entryNumber} Name</label>
  <input id="${entryDropdown.value}-${entryNumber}-name" type="text" placeholder="FoodName"/>
  <label for="${entryDropdown.value}-${entryNumber}-calories">EntryName ${entryNumber} Calories</label>
  <input id="${entryDropdown.value}-${entryNumber}-calories" type="number" min="0" placeholder="Calories"/>
`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number]"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type=number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type=number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type=number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type=number]"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  if (isError) {
    return;
  }
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;

  const surplusOrDeficit = remainingCalories >= 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr/>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>  
  `;
  output.classList.remove("hide");
}

function getCaloriesFromInputs(calorieInputList) {
  let calorie = 0;
  for (let i = 0; i < calorieInputList.length; i++) {
    const currentValue = cleanInputString(calorieInputList[i].value);
    const validInputMatch = isValidInput(currentValue);
    if (!validInputMatch) {
      alert(`Invalid Input:`);
      isError = true;
      return null;
    }
    calorie += Number(currentValue);
  }
  return calorie;
}

function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (let i = 0; i < inputContainers.length; i++) {
    inputContainers[i].innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}
addEntryButton.addEventListener("click", addEntry);

calorieCounter.addEventListener("submit", calculateCalories);

clearButton.addEventListener("click", clearForm);
