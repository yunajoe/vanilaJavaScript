const before_select = document.querySelector("#exchange-before-select"); // USD
const after_select = document.querySelector("#exchange-after-select"); // BGN
const cal_before_input = document.querySelector("#before-input");
const cal_after_input = document.querySelector("#after-input"); // <input id="after-input" type="number">
const cal_texts = document.querySelector("#exchange-calculate-value");
const swap_button = document.querySelector("#swap-button");
let swap_before_value;
swap_before_value = before_select.value; // USD
let swap_after_value;
swap_after_value = after_select.value; // BGN
let fromCurrency = 0;
let toCurrency = 0;
let Total = 0;
// https://www.geeksforgeeks.org/currency-converter-in-javascript/
let url =
  "https://v6.exchangerate-api.com/v6/db7b8e53e9914c5c9d0d3740/latest/USD";

async function fetchData() {
  const response = await fetch(url);
  if (response.status === 200) {
    const jsonData = await response.json();
    return jsonData;
  } else {
    throw new Error("오류가 났네욤");
  }
}

let unitNumber = cal_before_input.value;
displayData(unitNumber, swap_before_value, swap_after_value);

async function displayData(unitNumber, swap_before_value, swap_after_value) {
  let jsonObject = await fetchData();
  fromCurrency = jsonObject.conversion_rates[swap_before_value];
  toCurrency = jsonObject.conversion_rates[swap_after_value];

  swap_button.addEventListener("click", function (event) {
    let temp = swap_before_value;
    swap_before_value = swap_after_value;
    swap_after_value = temp;

    before_select.value = swap_before_value;
    after_select.value = swap_after_value;
    return displaySwapData(
      jsonObject,
      unitNumber,
      swap_before_value,
      swap_after_value
    );
  });
  return displaySwapData(
    jsonObject,
    unitNumber,
    swap_before_value,
    swap_after_value
  );
  // Total = (fromCurrency * toCurrency).toFixed(3);
  // cal_after_input.value = (Total * unitNumber).toFixed(3);
  // cal_texts.textContent = `기본단위 1unit >>> 1 ${swap_before_value} =  ${Total} ${swap_after_value}`;
}

before_select.addEventListener("change", function (event) {
  swap_before_value = before_select.value;
  swap_after_value = after_select.value;
  displayData(unitNumber, swap_before_value, swap_after_value);
});

after_select.addEventListener("change", function (event) {
  swap_after_value = event.target.value;
  swap_before_value = before_select.value;
  swap_after_value = after_select.value;

  displayData(unitNumber, swap_before_value, swap_after_value);
});

cal_before_input.addEventListener("change", function (event) {
  unitNumber = +event.target.value;
  swap_before_value = before_select.value;
  swap_after_value = after_select.value;
  // console.log(swap_before_value, swap_after_value);
  displayData(unitNumber, swap_before_value, swap_after_value);
});

function displaySwapData(
  jsonObject,
  unitNumber,
  swap_before_value,
  swap_after_value
) {
  fromCurrency = jsonObject.conversion_rates[swap_before_value];
  toCurrency = jsonObject.conversion_rates[swap_after_value];
  const swapCurrency = (toCurrency / fromCurrency).toFixed(3);
  cal_after_input.value = (swapCurrency * unitNumber).toFixed(3);
  cal_texts.textContent = `기본단위 1unit>>> 1 ${swap_before_value} =  ${swapCurrency} ${swap_after_value}`;
}
