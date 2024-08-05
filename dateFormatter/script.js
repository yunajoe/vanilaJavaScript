const dropDownList = document.querySelector("#dropdown");
const selectedDateFormat = document.querySelector(".selected-date-format");

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const initFormat = `${day}-${month}-${year}`;

const makeDateFormat = () => {};

const handleDropDownChange = () => {
  let dateFormat = dropDownList.value;
  switch (dateFormat) {
    case "Day, Month, Year":
      selectedDateFormat.textContent = `${day}-${month}-${year}`;
      break;
    case "Year, Month, Day":
      selectedDateFormat.textContent = `${year}-${month}-${day}`;
      break;
    case "Month, Day, Year, Hours, Minutes":
      selectedDateFormat.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;

      break;
    default:
      return;
  }
};

dropDownList.addEventListener("change", handleDropDownChange);

selectedDateFormat.textContent = initFormat;
