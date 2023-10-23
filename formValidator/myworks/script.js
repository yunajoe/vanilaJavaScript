let form = document.querySelector("#form");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let password2 = document.querySelector("#password2");

function successMessage(input, message) {
  let parentEle = input.parentElement;
  parentEle.classList.add("success");
  // let small = document.querySelector("small"); 이렇게 하면은 최상위 small태그밖에 안됨
  let small = parentEle.querySelector("small");
  small.innerText = message;
}

function failMessage(input, message) {
  let parentEle = input.parentElement;
  // parentEle.className = "fail"; >> 이렇게 하면은 class Name자체가 바뀐다
  parentEle.classList.add("fail");
  console.log(parentEle);
  // let small = document.querySelector("small");
  let small = parentEle.querySelector("small");
  small.innerText = message;
}

// 인풋태그의 값이 빈칸이면은 일차적으로 failmessage날려주기
function isBlank(inputArr) {
  inputArr.forEach((input) => {
    let cleanedValue = input.value.trim();
    if (cleanedValue.length === 0) {
      failMessage(input, "빈값입니다");
    } else {
      successMessage(input, "값을 넣으셨네요!");
    }
  });
}

// username은 글자의 갯수를 제한한다
function checkLength(input, min, max) {
  let cleanedValue = input.value.trim();
  if (cleanedValue.length < min || cleanedValue.length > max) {
    failMessage(input, "글자수를 확인해주세요");
  } else {
    successMessage(input, "글자수가맞네요!");
  }
}

// email 유효성 검사
function checkEmail(input) {
  let cleanedValue = input.value.trim();
  let emailRegex = /^[a-zA-Z0-9]{3,}@[a-z]+\.[a-z]{3,}$/g;

  // regex.test(테스트할값)
  if (emailRegex.test(cleanedValue)) {
    successMessage(input, "이메일이 유효합니다!");
  } else {
    failMessage(input, "이메일이 유효하지 않아요");
  }
}

// passwordMatch
function checkPassword(pwd1, pwd2) {
  let cleandPWD1 = pwd1.value.trim();
  let cleandPWD2 = pwd2.value.trim();
  if (cleandPWD1 !== cleandPWD2) {
    failMessage(pwd2, "패스워드가 맞질 않습니다");
  } else {
    successMessage(pwd2, "패스워드가 일치 합니다");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); // 이걸안하면은 데이터가 서버에 안 보내짐
  isBlank([username, email, password, password2]);

  // username이 빈칸이 아니라면은 username유효성 검사를 해준다
  if (username.value.trim() !== "") {
    checkLength(username, 3, 10);
  }
  if (email.value.trim() !== "") {
    checkEmail(email);
  }
  if (password.value.trim() !== "") {
    checkLength(password, 5, 20);
  }
  if (password.value.trim().length >= 5 && password.value.trim().length <= 20) {
    checkPassword(password, password2);
  }
});
