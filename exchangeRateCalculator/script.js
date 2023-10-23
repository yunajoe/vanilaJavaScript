// function calculate() {
//   //    fetch("items.json").then((res) => console.log(res) 일때 Response {type: 'basic', url: 'http://127.0.0.1:5500/items.json', redirected: false, status: 200, ok: true, …}
//   //  fetch("items.json").then((res) => console.log(res.json()));때는 return값이 Promise [pending]이다
//   //   fetch("items.json")
//   //   .then((res) => res.json())
//   //   .then((data) => console.log(data)); 때는 [{}, {}, {}]
//   // }
// }

// calculate();

// 환전하기전 select 태그
const currencyEl_one = document.getElementById("currency-one");
// 환전하기전 input태그
const amountEl_one = document.getElementById("amount-one");
// 환전한후 select태그
const currencyEl_two = document.getElementById("currency-two");
// 환전한후 input태그
const amountEl_two = document.getElementById("amount-two");

// swap버튼
const swap = document.getElementById("swap");

// 얘뭐지
const rateEl = document.getElementById("rate");

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  // console.log(currency_one, currency_two); // USD AED
  // console.log(fecth())를 하면은 promise 객체가 return이 된다
  fetch(
    `https://v6.exchangerate-api.com/v6/db7b8e53e9914c5c9d0d3740/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      //  currency one을 currencytwo로 바꿀떄 value값
      const rate = data.conversion_rates[currency_two];
      //   1 currency_one단위 = 2 cureency_one단위
      // 예를 들어 1 USD = 0.232323 EXR
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// 이벤트 리스너
// currencyEl_one.addEventListener("change", calculate());
// select메뉴가 변할때
currencyEl_one.addEventListener("change", calculate);
// 인풋값이 변할때
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

// 환율변경하는 전, 후 select바꾸기

swap.addEventListener("click", function () {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});
