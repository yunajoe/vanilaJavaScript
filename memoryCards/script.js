// 버튼
const addNewButton = document.querySelector(".add-button");
const closeButton = document.querySelector(".close-button");
const addCardButton = document.querySelector(".add-card-button");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const clearButton = document.querySelector(".clear-button");
// 컨테이너
const wrapper = document.querySelector(".wrapper");
const cardContainer = document.querySelector(".container");
const newCardContainer = document.querySelector(".new-card-container");
const navigationContainer = document.querySelector(".card-navigation");
const filledCardContainer = document.querySelector(".filled-card");

// textArea
const questionTextArea = document.querySelector("#question");
const answerTextArea = document.querySelector("#answer");

// card
const vacantCard = document.querySelector(".vacant-card");

// const
let isFlipped = false;
let cardData = [];
let initPage = 1;

const handleReset = () => {
  questionTextArea.value = null;
  answerTextArea.value = null;
};

const handleCurrentAndTotalPage = () => {
  const localStorageCards = JSON.parse(localStorage.getItem("cards"));
  const totalPage = document.querySelector(".total-page");
  if (localStorageCards) {
    const numberOfCards = localStorageCards.length;
    totalPage.textContent = numberOfCards;
  }
};

const showNextOtherCard = (currentPage, localStorageCards) => {
  if (currentPage >= localStorageCards.length) return;
  const cardsList = document.querySelectorAll(".card");
  cardsList.forEach((card, index) => {
    if (currentPage === index) {
      card.classList.remove("disappear");
      card.classList.add("appear");
    } else {
      const innerCard = card.querySelector(".inner-card");
      innerCard.classList.remove("rotate");
      card.classList.remove("appear");
      card.classList.add("disappear");
    }
  });
};

const showPrevOtherCard = (currentPage) => {
  const targetIndex = currentPage - 2;
  const cardsList = document.querySelectorAll(".card");
  cardsList.forEach((card, index) => {
    if (index === targetIndex) {
      card.classList.remove("disappear");
      card.classList.add("appear");
    } else {
      const innerCard = card.querySelector(".inner-card");
      innerCard.classList.remove("rotate");
      card.classList.remove("appear");
      card.classList.add("disappear");
    }
  });
};

const handlePrevPage = () => {
  let currentPage = document.querySelector(".current-page");
  let value = Number(currentPage.textContent);

  if (value >= 2) {
    currentPage.textContent = value - 1;
    showPrevOtherCard(value);
  }
};

const handleNextPage = () => {
  const localStorageCards = JSON.parse(localStorage.getItem("cards"));
  let currentPage = document.querySelector(".current-page");
  let value = Number(currentPage.textContent);
  if (localStorageCards.length > value) {
    currentPage.textContent = value + 1;
  }
  showNextOtherCard(value, localStorageCards);
};

//  펑션
const handleChangeScreen = () => {
  cardContainer.classList.add("hidden");
  cardContainer.classList.add("disappear");

  // 새로운 카드
  newCardContainer.classList.add("show");
  newCardContainer.classList.remove("disappear");

  // add 카드 버튼
  addCardButton.classList.remove("disappear");
  addCardButton.classList.add("appear");
};

const handleCloseScreen = () => {
  cardContainer.classList.remove("hidden");
  newCardContainer.classList.remove("show");
  location.reload();
};

const handleFlipCard = () => {
  const appearCard = document.querySelector(".card.appear .inner-card");

  if (!isFlipped) {
    appearCard.classList.add("rotate");
    isFlipped = true;
  } else {
    appearCard.classList.remove("rotate");
    isFlipped = false;
  }
};

const handleClearCard = () => {
  localStorage.removeItem("cards");
  location.reload(true);
};

// 카드 추가하기
const handleAddCard = () => {
  const questionText = questionTextArea.value.trim();
  const answerText = answerTextArea.value.trim();
  if (questionText.length === 0 || answerText.length === 0) {
    alert("질문 또는 답변을 채워주세요");
    return;
  }

  if (questionText.length > 0 && answerText.length > 0) {
    const newData = {
      question: questionText,
      answer: answerText,
    };

    const localStorageCards = JSON.parse(localStorage.getItem("cards"));
    if (localStorageCards) {
      cardData = [...localStorageCards, newData];
    } else {
      cardData = [...cardData, newData];
    }

    localStorage.setItem("cards", JSON.stringify(cardData));
    removeCardDom();
    createCardDom();

    // navigation

    navigationContainer.classList.remove("disappear");
    navigationContainer.classList.add("appear");
    handleCurrentAndTotalPage();
    // handleNextPage();

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
};

// 카드 지우기
const removeCardDom = () => {
  const cardsNodeList = document.querySelectorAll(".card");
  cardsNodeList.forEach((card) => card.remove());
};

// 카드생성
const createCardDom = () => {
  const localStorageCards = JSON.parse(localStorage.getItem("cards")) || [];
  localStorageCards.forEach((card, index) => {
    if (index === 0) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.classList.add("appear");
      cardElement.classList.remove("disappear");
      cardElement.innerHTML = `
        <div class="inner-card">
          <div class="inner-front-card">${card.question}</div>
          <div class="inner-back-card">${card.answer}</div>
        </div>
      `;
      filledCardContainer.appendChild(cardElement);
    } else {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.classList.add("disappear");
      cardElement.classList.remove("appear");
      cardElement.innerHTML = `
        <div class="inner-card">
          <div class="inner-front-card">${card.question}</div>
          <div class="inner-back-card">${card.answer}</div>
        </div>
      `;
      filledCardContainer.appendChild(cardElement);
    }
  });
};

// for the init
document.addEventListener("DOMContentLoaded", () => {
  const localStorageCards = JSON.parse(localStorage.getItem("cards"));
  if (localStorageCards) {
    vacantCard.classList.add("disappear");
    navigationContainer.classList.remove("disappear");
    navigationContainer.classList.add("appear");
  } else {
    navigationContainer.classList.remove("appear");
    navigationContainer.classList.add("disappear");
  }
});

// 버튼
addNewButton.addEventListener("click", handleChangeScreen);
closeButton.addEventListener("click", handleCloseScreen);
addCardButton.addEventListener("click", handleAddCard);
filledCardContainer.addEventListener("click", handleFlipCard);
rightButton.addEventListener("click", handleNextPage);
leftButton.addEventListener("click", handlePrevPage);
clearButton.addEventListener("click", handleClearCard);

// for refresh

createCardDom();
handleCurrentAndTotalPage();
