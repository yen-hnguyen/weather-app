let now = new Date();

let day = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let hour = now.getHours();
let minute = now.getMinutes();

function getFullMinutes() {
  if (minute < 10) {
    return "0" + minute;
  }
  return minute;
}

function getFullHour() {
  if (hour < 10) {
    return "0" + hour;
  }
  return hour;
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
currentTime.innerHTML = `${days[day]}, ${
  months[month]
} ${date} ${getFullHour()}:${getFullMinutes()}`;

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

function showTemperatureInfo(response) {
  console.log(response);
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector(".searched-city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  ); // convert from m/s to km/h
  document.querySelector("#wind-gust").innerHTML = Math.round(
    response.data.wind.gust * 3.6
  ); // convert from m/s to km/h
  document.querySelector("#visibility").innerHTML =
    response.data.visibility / 1000; // convert from m/s to km/h

  let sunriseTime = new Date(
    (response.data.sys.sunrise + response.data.timezone) * 1000
  ); // get the
  console.log(sunriseTime);
}

function searchCity(event) {
  event.preventDefault();
  let searchedCityInput = document.querySelector("#search-bar");
  let searchedCity = document.querySelector(".searched-city");
  searchedCity.innerHTML = `${searchedCityInput.value}`;

  let apiKey = "6205aed09d3502bfb77cd3492c5fda5d";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl1).then(showTemperatureInfo);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function displayPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "6205aed09d3502bfb77cd3492c5fda5d";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl2).then(showTemperatureInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

window.onload = getCurrentLocation;
