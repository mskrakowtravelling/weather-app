// current date
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
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let hours = addZero(now.getHours());
  let minutes = addZero(now.getMinutes());

  return `${day}, ${date} ${month} ${hours}:${minutes}`;
}

let h2 = document.querySelector("h2");
h2.innerHTML = showCurrentDate();

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
  iconElement.src = iconSrc;

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
  let cityName = inputCity.innerHTML;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
window.onload = setTemperature();

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-box");
  let citySearch = `${searchInput.value}`;
  document.getElementById("search-box").value = "";

  let apiKey = "8a5a5cc90e2c01a958e2254f16f6442f";
  let cityName = citySearch;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${apiKey}`;


  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#input-city");
cityForm.addEventListener("submit", searchCity);

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
