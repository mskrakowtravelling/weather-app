
// current date ------------------------------------------------------------------------------------------
function addZero(t) {
  return (t < 10 ? "0" : "") + t;
}

function showCurrentDate() {
  let now = new Date();

  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
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
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = fullDate
  setTimeout(showCurrentDate, 1000);
}

function showLocalTime(time) {
  let timeZoneName = time.data.timezone;

  function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
  }

  let now = convertTZ(new Date(), timeZoneName);

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
  let localTime = document.querySelector("#local-time");
  localTime.innerHTML = fullDate
}


function getLocalDate(coordinates) {
  lat = coordinates.lat;
  lon = coordinates.lon;

  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let units = "metric";
  let urlEnd = "https://api.openweathermap.org/data/2.5/onecall?"
  let apiUrl = `${urlEnd}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showLocalTime);

}
// API key - weather--------------------------------------------------------------------------
function showWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekday = date.getDay();
  let weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return weekdays[weekday];

}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-center forecast">`

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML = forecastHTML + `
            <div class="col-2 temp-box">
              <div class="weekday">${showWeekday(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="55"
                class="forecast-icon"
              />
              <div class="temp">
                <span class="forecast-day">${Math.round(forecastDay.temp.day)}°<span class="forecast-night"
                > | ${Math.round(forecastDay.temp.night)}°
              </div>
            </div> `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  lat = coordinates.lat;
  lon = coordinates.lon;

  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let units = "metric";
  let urlEnd = "https://api.openweathermap.org/data/2.5/onecall?"
  let apiUrl = `${urlEnd}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function changeBackground(response) {
  let background = document.querySelector(".main-data");
  if (response === "Clear") {
    background.style.backgroundImage = "url(../images/clear3.jpg)";
  }
  else if (response === "Clouds") {
    background.style.backgroundImage = "url(../images/cloudy1.jpg)";
    // background.style.backgroundImage = "url(https://images.pexels.com/photos/691859/pexels-photo-691859.jpeg?auto=compress&cs=tinysrgb&w=600)";

  }
  else if (response === "Snow") {
    background.style.backgroundImage = "url(../images/snowy.jpg)";
  }
  else if (response === (`Drizzle` | `Rain`)) {
    background.style.backgroundImage = "url(../images/rainy.jpg)";
  } else if (response === `thunderstorm`) {
    background.style.backgroundImage = "url(../images/thunderstorm.jpg)";
  } else {
    background.style.backgroundImage = "url(../images/cloudy.jpg)"
  }

}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = temperature;

  let conditions = response.data.weather[0].description;
  let conditionsElement = document.querySelector("#weather-conditions");
  conditionsElement.innerHTML = conditions;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let windMs = response.data.wind.speed;
  let wind = Math.round(3.6 * windMs);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} km/h`;

  let icon = response.data.weather[0].icon;
  let iconElement = document.getElementById("weather-icon");
  let iconSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let iconAlt = response.data.weather[0].description;
  iconElement.src = iconSrc;
  iconElement.alt = iconAlt;

  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;

  let countryCode = response.data.sys.country;
  let countryName = new Intl.DisplayNames(
    ['en'], { type: 'region' });
  let country = countryName.of(countryCode);
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = country;

  let background = response.data.weather[0].main;
  changeBackground(`Clouds`)

  console.log(response.data.weather[0].main)

  getForecast(response.data.coord);
  getLocalDate(response.data.coord);
}

// Search engin return------------------------------------------------------------------------
function searchCity(city) {
  let apiKey = "8a5a5cc90e2c01a958e2254f16f6442f";
  let units = "metric";
  let urlEnd = "https://api.openweathermap.org/data/2.5/weather?"
  let apiUrl = `${urlEnd}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
  document.getElementById("search-box").value = "";
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
  let urlEnd = "https://api.openweathermap.org/data/2.5/weather?"
  let apiUrl = `${urlEnd}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getMyPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", findLocation);

searchCity("Oaxaca");
showCurrentDate()
