
// current date
showCurrentDate()
function addZero(t) {
  return (t < 10 ? "0" : "") + t;
}
function showCurrentDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();

  let months = [
    "Jan",
    "Feby",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let hours = addZero(now.getHours());
  let minutes = addZero(now.getMinutes());

  let fullDate = `${day}, ${date} ${month} ${hours}:${minutes}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = fullDate
  setTimeout(showCurrentDate, 1000);
}
// Search engin return------------------------------------------------------------------------

// API key - weather--------------------------------------------------------------------------
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.list[0].main.temp);
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = temperature;

  // let tempOne = Math.round(response.data.list[1].main.temp);
  // let tempOneElement = document.querySelector("#temp-one");
  // tempOneElement.innerHTML = tempOne

  // let tempTwo = Math.round(response.data.list[2].main.temp);
  // let tempTwoElement = document.querySelector("#temp-two");
  // tempTwoElement.innerHTML = tempTwo;

  // let tempThree = Math.round(response.data.list[2].main.temp);
  // let tempThreeElement = document.querySelector("#temp-three");
  // tempThreeElement.innerHTML = tempThree;

  // let tempFour = Math.round(response.data.list[2].main.temp);
  // let tempFourElement = document.querySelector("#temp-four");
  // tempFourElement.innerHTML = tempFour;

  // let tempFive = Math.round(response.data.list[2].main.temp);
  // let tempFiveElement = document.querySelector("#temp-five");
  // tempFiveElement.innerHTML = tempFive;

  let conditions = response.data.list[0].weather[0].description;
  let conditionsElement = document.querySelector("#weather-conditions");
  conditionsElement.innerHTML = conditions;

  let humidity = response.data.list[0].main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let windMs = response.data.list[0].wind.speed;
  let wind = Math.round(3.6 * windMs);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} km/h`;

  let icon = response.data.list[0].weather[0].icon;
  let iconElement = document.getElementById("weather-icon");
  let iconSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let iconAlt = response.data.list[0].weather[0].description;
  iconElement.src = iconSrc;
  iconElement.alt = iconAlt;

  let city = response.data.city.name
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;

  let countryCode = response.data.city.country;
  let countryName = new Intl.DisplayNames(
    ['en'], { type: 'region' });
  let country = countryName.of(countryCode);
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = country;

}

function setTemperature() {
  let inputCity = document.querySelector("#city");
  let apiKey = "8a5a5cc90e2c01a958e2254f16f6442f";
  let cityName = "Bogota";
  let units = "metric";
  let urlPart = `https://api.openweathermap.org/data/2.5/forecast?`
  let apiUrl = `${urlPart}q=${cityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
window.onload = setTemperature();

function searchCity(city) {
  let apiKey = "8a5a5cc90e2c01a958e2254f16f6442f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-box");
  searchCity(searchInput.value);

}
let cityForm = document.querySelector("#input-city");
cityForm.addEventListener("submit", handleSubmit);

// Geolocation
function getMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8a5a5cc90e2c01a958e2254f16f6442f";
  let units = "metric";
  let urlEnd = "https://api.openweathermap.org/data/2.5/forecast?"
  let apiUrl = `${urlEnd}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getMyPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", findLocation);

// Celsius to Fahrenheit
function changetoFahr(event) {
  // temperature ============================================
  let mainTemp = document.querySelector("#main-temp");
  let mainTempNum = parseInt(mainTemp.innerHTML, 10);
  let mainFtemp = Math.round((mainTempNum * 9) / 5 + 32);
  mainTemp.innerHTML = mainFtemp;
  // let dayTemperature = document.querySelector("#temp-day");
  // dayTemperature.innerHTML = mainFtemp;

  // units======================================================
  let fahr = document.querySelector("#fahrenheit");
  let cel = document.querySelector("#celsius");
  fahr.classList.add("fahr");
  cel.classList.remove("cels");
}
let fahr = document.querySelector("#fahrenheit");
fahr.addEventListener("click", changetoFahr);

// Fahrenheit to Celsius
function changetoCels(event) {
  // temperature ============================================
  let mainTemp = document.querySelector("#main-temp");
  let mainTempNum = parseInt(mainTemp.innerHTML, 10);
  let mainCtemp = Math.round(((mainTempNum - 32) * 5) / 9);
  mainTemp.innerHTML = mainCtemp;
  // let dayTemperature = document.querySelector("#temp-day");
  // dayTemperature.innerHTML = mainCtemp;

  // units======================================================
  let fahr = document.querySelector("#fahrenheit");
  let cel = document.querySelector("#celsius");
  fahr.classList.remove("fahr");
  cel.classList.add("cels");
}
let cel = document.querySelector("#celsius");
cel.addEventListener("click", changetoCels);

// forecast - weekdays
// function showDay(day) {
//   let days = [
//     "Sun",
//     "Mon",
//     "Tue",
//     "Wed",
//     "Thu",
//     "Fri",
//     "Sat",
//   ];
//   return days[day];
// }
// let today = new Date().getDay();
// let weekday1 = today < 6 ? today + 1 : 0;
// weekday1Element = document.querySelector("#day-one");
// weekday1Element.innerHTML = showDay(weekday1);

// let weekday2 = weekday1 < 6 ? weekday1 + 1 : 0;
// let weekday2Element = document.querySelector("#day-two");
// weekday2Element.innerHTML = showDay(weekday2);

// let weekday3 = weekday2 < 6 ? weekday2 + 1 : 0;
// let weekday3Element = document.querySelector("#day-three");
// weekday3Element.innerHTML = showDay(weekday3);

// let weekday4 = weekday3 < 6 ? weekday3 + 1 : 0;
// let weekday4Element = document.querySelector("#day-four");
// weekday4Element.innerHTML = showDay(weekday4);

// let weekday5 = weekday4 < 6 ? weekday4 + 1 : 0;
// let weekday5Element = document.querySelector("#day-five");
// weekday5Element.innerHTML = showDay(weekday5);