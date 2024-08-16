"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// 버튼
var addNewButton = document.querySelector(".add-button");
var closeButton = document.querySelector(".close-button");
var addCardButton = document.querySelector(".add-card-button");
var leftButton = document.querySelector(".left-button");
var rightButton = document.querySelector(".right-button");
var clearButton = document.querySelector(".clear-button"); // 컨테이너

var wrapper = document.querySelector(".wrapper");
var cardContainer = document.querySelector(".container");
var newCardContainer = document.querySelector(".new-card-container");
var navigationContainer = document.querySelector(".card-navigation");
var filledCardContainer = document.querySelector(".filled-card"); // textArea

var questionTextArea = document.querySelector("#question");
var answerTextArea = document.querySelector("#answer"); // card

var vacantCard = document.querySelector(".vacant-card"); // const

var isFlipped = false;
var cardData = [];
var initPage = 1;

var handleReset = function handleReset() {
  questionTextArea.value = null;
  answerTextArea.value = null;
};

var handleCurrentAndTotalPage = function handleCurrentAndTotalPage() {
  var localStorageCards = JSON.parse(localStorage.getItem("cards"));
  var totalPage = document.querySelector(".total-page");

  if (localStorageCards) {
    var numberOfCards = localStorageCards.length;
    totalPage.textContent = numberOfCards;
  }
};

var showNextOtherCard = function showNextOtherCard(currentPage, localStorageCards) {
  if (currentPage >= localStorageCards.length) return;
  var cardsList = document.querySelectorAll(".card");
  cardsList.forEach(function (card, index) {
    if (currentPage === index) {
      card.classList.remove("disappear");
      card.classList.add("appear");
    } else {
      var innerCard = card.querySelector(".inner-card");
      innerCard.classList.remove("rotate");
      card.classList.remove("appear");
      card.classList.add("disappear");
    }
  });
};

var showPrevOtherCard = function showPrevOtherCard(currentPage) {
  var targetIndex = currentPage - 2;
  var cardsList = document.querySelectorAll(".card");
  cardsList.forEach(function (card, index) {
    if (index === targetIndex) {
      card.classList.remove("disappear");
      card.classList.add("appear");
    } else {
      var innerCard = card.querySelector(".inner-card");
      innerCard.classList.remove("rotate");
      card.classList.remove("appear");
      card.classList.add("disappear");
    }
  });
};

var handlePrevPage = function handlePrevPage() {
  var currentPage = document.querySelector(".current-page");
  var value = Number(currentPage.textContent);

  if (value >= 2) {
    currentPage.textContent = value - 1;
    showPrevOtherCard(value);
  }
};

var handleNextPage = function handleNextPage() {
  var localStorageCards = JSON.parse(localStorage.getItem("cards"));
  var currentPage = document.querySelector(".current-page");
  var value = Number(currentPage.textContent);

  if (localStorageCards.length > value) {
    currentPage.textContent = value + 1;
  }

  showNextOtherCard(value, localStorageCards);
}; //  펑션


var handleChangeScreen = function handleChangeScreen() {
  cardContainer.classList.add("hidden");
  cardContainer.classList.add("disappear"); // 새로운 카드

  newCardContainer.classList.add("show");
  newCardContainer.classList.remove("disappear"); // add 카드 버튼

  addCardButton.classList.remove("disappear");
  addCardButton.classList.add("appear");
};

var handleCloseScreen = function handleCloseScreen() {
  cardContainer.classList.remove("hidden");
  newCardContainer.classList.remove("show");
  location.reload();
};

var handleFlipCard = function handleFlipCard() {
  var appearCard = document.querySelector(".card.appear .inner-card");

  if (!isFlipped) {
    appearCard.classList.add("rotate");
    isFlipped = true;
  } else {
    appearCard.classList.remove("rotate");
    isFlipped = false;
  }
};

var handleClearCard = function handleClearCard() {
  localStorage.removeItem("cards");
  location.reload(true);
}; // 카드 추가하기


var handleAddCard = function handleAddCard() {
  var questionText = questionTextArea.value.trim();
  var answerText = answerTextArea.value.trim();

  if (questionText.length === 0 || answerText.length === 0) {
    alert("질문 또는 답변을 채워주세요");
    return;
  }

  if (questionText.length > 0 && answerText.length > 0) {
    var newData = {
      question: questionText,
      answer: answerText
    };
    var localStorageCards = JSON.parse(localStorage.getItem("cards"));

    if (localStorageCards) {
      cardData = [].concat(_toConsumableArray(localStorageCards), [newData]);
    } else {
      cardData = [].concat(_toConsumableArray(cardData), [newData]);
    }

    localStorage.setItem("cards", JSON.stringify(cardData));
    removeCardDom();
    createCardDom(); // navigation

    navigationContainer.classList.remove("disappear");
    navigationContainer.classList.add("appear");
    handleCurrentAndTotalPage(); // handleNextPage();
    // 처음화면으로 돌아가기

    vacantCard.classList.add("disappear");
    newCardContainer.classList.remove("show");
    cardContainer.classList.remove("hidden");
    cardContainer.classList.remove("disappear");
    cardContainer.classList.add("show");
    addCardButton.classList.remove("appear");
    addCardButton.classList.add("disappear");
    handleReset();
  }
}; // 카드 지우기


var removeCardDom = function removeCardDom() {
  var cardsNodeList = document.querySelectorAll(".card");
  cardsNodeList.forEach(function (card) {
    return card.remove();
  });
}; // 카드생성


var createCardDom = function createCardDom() {
  var localStorageCards = JSON.parse(localStorage.getItem("cards")) || [];
  localStorageCards.forEach(function (card, index) {
    if (index === 0) {
      var cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.classList.add("appear");
      cardElement.classList.remove("disappear");
      cardElement.innerHTML = "\n        <div class=\"inner-card\">\n          <div class=\"inner-front-card\">".concat(card.question, "</div>\n          <div class=\"inner-back-card\">").concat(card.answer, "</div>\n        </div>\n      ");
      filledCardContainer.appendChild(cardElement);
    } else {
      var _cardElement = document.createElement("div");

      _cardElement.classList.add("card");

      _cardElement.classList.add("disappear");

      _cardElement.classList.remove("appear");

      _cardElement.innerHTML = "\n        <div class=\"inner-card\">\n          <div class=\"inner-front-card\">".concat(card.question, "</div>\n          <div class=\"inner-back-card\">").concat(card.answer, "</div>\n        </div>\n      ");
      filledCardContainer.appendChild(_cardElement);
    }
  });
}; // for the init


document.addEventListener("DOMContentLoaded", function () {
  var localStorageCards = JSON.parse(localStorage.getItem("cards"));

  if (localStorageCards) {
    vacantCard.classList.add("disappear");
    navigationContainer.classList.remove("disappear");
    navigationContainer.classList.add("appear");
  } else {
    navigationContainer.classList.remove("appear");
    navigationContainer.classList.add("disappear");
  }
}); // 버튼

addNewButton.addEventListener("click", handleChangeScreen);
closeButton.addEventListener("click", handleCloseScreen);
addCardButton.addEventListener("click", handleAddCard);
filledCardContainer.addEventListener("click", handleFlipCard);
rightButton.addEventListener("click", handleNextPage);
leftButton.addEventListener("click", handlePrevPage);
clearButton.addEventListener("click", handleClearCard); // for refresh

createCardDom();
handleCurrentAndTotalPage();