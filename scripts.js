let now = new Date();

let currentDay = now.getDay();
let currentDate = now.getDate();
let currentMonth = now.getMonth();
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

function getFullMinutes() {
  if (currentMinute < 10) {
    return "0" + currentMinute;
  }
  return currentMinute;
}

function getFullHour() {
  if (currentHour < 10) {
    return "0" + currentHour;
  }
  return currentHour;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
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

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${days[currentDay]}, ${
  months[currentMonth]
} ${currentDate} ${getFullHour()}:${getFullMinutes()}`;

function convertCelsiusTemp(event) {
  event.preventDefault();
  let currentCelsiusTemp = document.querySelector("#current-temp");
  currentCelsiusTemp.innerHTML = "33°C";
  let feelsLikeCelsiusTemp = document.querySelector("#feels-like-temp");
  feelsLikeCelsiusTemp.innerHTML = "40°C";
}

let convertToCelsius = document.querySelector("#celsius-temp");
convertToCelsius.addEventListener("click", convertCelsiusTemp);

function convertFahrenheitTemp(event) {
  event.preventDefault();
  let currentFahrenheitTemp = document.querySelector("#current-temp");
  currentFahrenheitTemp.innerHTML = "78°F";
  let feelsLikeFahrenheitTemp = document.querySelector("#feels-like-temp");
  feelsLikeFahrenheitTemp.innerHTML = "87°F";
}

let convertToFahrenheit = document.querySelector("#fahrenheit-temp");
convertToFahrenheit.addEventListener("click", convertFahrenheitTemp);

function showTemperature(response) {
  let searchedCityTemp = document.querySelector("#current-temp");
  searchedCityTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let searchedCityFeelsLikeTemp = document.querySelector("#feels-like-temp");
  searchedCityFeelsLikeTemp.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
}

function searchCity(event) {
  event.preventDefault();
  let searchedCityInput = document.querySelector("#search-bar");
  let searchedCity = document.querySelector(".searched-city");
  searchedCity.innerHTML = `${searchedCityInput.value}`;

  let apiKey = "6205aed09d3502bfb77cd3492c5fda5d";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl1).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showCurrentInfo(response) {
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = response.data.name;
  let currentLocationTemp = document.querySelector("#current-temp");
  currentLocationTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let currentLocationFeelsLikeTemp = document.querySelector("#feels-like-temp");
  currentLocationFeelsLikeTemp.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
}

function displayPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "6205aed09d3502bfb77cd3492c5fda5d";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl2).then(showCurrentInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let element = document.querySelector("#current-button");
element.addEventListener("click", getCurrentLocation);
