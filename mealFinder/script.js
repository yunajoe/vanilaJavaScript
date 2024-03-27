const searchButton = document.querySelector(".search-button");
const shuffleButton = document.querySelector(".shuffle-button");
const searchInputValue = document.querySelector(".search-input");
const outputWrapper = document.querySelector(".output-wrapper");
const searchKeyWorld = document.querySelector(".search-keyword");
const randomOutputWrapper = document.querySelector(".random-wrapper");

function disPlayMeals(meals, searchedValue) {
  randomOutputWrapper.innerHTML = "";
  outputWrapper.classList.remove("display-none");
  if (meals === null) {
    handleSearchedValueTitle(meals);
    return;
  } else {
    handleSearchedValueTitle(searchedValue);
  }
  const result = meals.map((meal) => {
    // image랑 title를 wrap하는 큰 태그
    let ele = document.createElement("div");
    // 이미지
    let img = document.createElement("img");
    let mealInfo = document.createElement("div");

    ele.setAttribute("class", "meal");
    ele.setAttribute("id", `meal-${meal.idMeal}`);

    img.setAttribute("src", meal.strMealThumb);
    img.setAttribute("alt", meal.strMeal); // 대체 텍스트 설정 (선택사항)

    mealInfo.setAttribute("class", "meal-info");

    mealInfo.innerHTML = `<h1>${meal.strMeal}</h1>`;

    ele.appendChild(img);
    ele.appendChild(mealInfo);
    return ele;
  });

  result.forEach((item) => {
    outputWrapper.appendChild(item);
  });
}

const getIngredient = (randomMeal) => {
  const container = Array.from({ length: 20 }).fill();

  for (let i = 1; i <= 20; i++) {
    let inGredient = randomMeal[`strIngredient${i}`];
    container[i] = inGredient;
  }
  let filteredIngreContainer = container.filter((item) => item);
  return filteredIngreContainer;
};

function randomDisplayMeal(value) {
  randomOutputWrapper.innerHTML = "";
  const randomMeal = value[0];

  const { strMeal, strMealThumb, strCategory, strArea, strInstructions } =
    randomMeal;

  const filteredIngreContainer = getIngredient(randomMeal);

  outputWrapper.classList.add("display-none");

  let ele = document.createElement("div");

  ele.setAttribute("class", "random-meal");

  ele.innerHTML = `
  <h1>${strMeal}</h1>
  <img src=${strMealThumb} alt=${strMeal}></img>
  <div class="random-meal-category">
    <span>${strArea}</span>  
    <span>${strCategory}</span> 

  </div>

  <div class="random-meal-info">
      <p class="random-meal-instructions">${strInstructions}</p>
      <h2>Ingredients</h2>  
  </div>     
  
  `;

  randomOutputWrapper.appendChild(ele);

  // ingredient 만들기
  let ul = document.createElement("div");
  filteredIngreContainer.forEach((ele) => {
    let li = document.createElement("li");
    li.textContent = ele;
    ul.appendChild(li);
  });

  const randomMealWrapper = document.querySelector(".random-meal-info");
  randomMealWrapper.appendChild(ul);
}

// 검색한 keyWord를 나타내는 거
const handleSearchedValueTitle = (value) => {
  if (value === null) {
    searchKeyWorld.textContent = "There are no search results. Try again!";
  } else {
    searchKeyWorld.textContent = `Search results for ${value}`;
  }
};

const resetNodeFunction = (allMeals) => {
  allMeals.forEach((node) => {
    outputWrapper.removeChild(node);
  });
};
const handleSearchFunction = () => {
  const alLMeals = document.querySelectorAll(".meal");
  if (alLMeals.length > 0) {
    resetNodeFunction(alLMeals);
  }
  const searchedValue = searchInputValue.value.trim();

  if (searchedValue.length === 0) {
    alert("Please enter a search term");
    return;
  }

  const searchResultArray = fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedValue}`
  ).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => data.meals);
    } else {
      throw new Error(`${response.status}`);
    }
  });

  searchResultArray.then(
    function (value) {
      disPlayMeals(value, searchedValue);
    },
    // error객체에 위에에서 던졌던, response.status가 들어가게 된다
    function (error) {
      throw new Error(`${error}`);
    }
  );
};

// 셔플기능
const handleShuffleFunction = () => {
  const randomFoodArray = fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  ).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => data.meals);
    } else {
      throw new Error(`${response.status}`);
    }
  });

  randomFoodArray.then(
    function (value) {
      randomDisplayMeal(value);
    },
    function (error) {
      throw new Error(`${error}`);
    }
  );
};

searchButton.addEventListener("click", handleSearchFunction);

shuffleButton.addEventListener("click", handleShuffleFunction);
