const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}
function getFiledName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFiledName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFiledName(input)} must be at least${min}`);
  } else if (input.value.length > max) {
    showError(input, `${getFiledName(input)} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
}

// check passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password Not Match");
  }
}

// Event Listener;
// console.log(form);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  {
    checkLength(username, 3, 5);
    checkEmail(email);
    checkPasswordMatch(password, password2);
  }

  //   checkRequired(username);
  //   checkRequired(email);
  //   checkRequired(password);
  //   checkRequired(password2);

  //   if (username.value === "") {
  //     showError(username, "Username is Required");
  //   } else {
  //     showSuccess(username);
  //   }

  //   if (email.value === "") {
  //     showError(email, "Email is Required");
  //   } else if (!checkEmail(email.value)) {
  //     showError(email, "Email is valid");
  //   } else {
  //     showSuccess(email);
  //   }

  //   if (password.value === "") {
  //     showError(password, "password is Required");
  //   } else {
  //     showSuccess(password);
  //   }

  //   if (password2.value === "") {
  //     showError(password2, "password2 is Required");
  //   } else {
  //     showSuccess(password2);
  //   }
});
