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

function showTemperatureInfo(response) {
  console.log(response);
  celciusTemp = response.data.main.temp;
  celciusFeelsLikeTemp = response.data.main.feels_like;
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector(".searched-city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    celciusTemp
  )}°C`;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(
    celciusFeelsLikeTemp
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
  document.querySelector("#visibility").innerHTML =
    response.data.visibility / 1000; // convert from m/s to km/h
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

let celciusTemp = null;
let celciusFeelsLikeTemp = null;

function displayCelsiusTemp(event) {
  event.preventDefault();
  convertToFahrenheit.classList.remove("active");
  convertToCelsius.classList.add("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    celciusTemp
  )}°C`;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(
    celciusFeelsLikeTemp
  )}°C`;
}

let convertToCelsius = document.querySelector("#celsius-temp");
convertToCelsius.addEventListener("click", displayCelsiusTemp);

function convertToFahrenheitTemp(event) {
  event.preventDefault();
  convertToCelsius.classList.remove("active");
  convertToFahrenheit.classList.add("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    (celciusTemp * 9) / 5 + 32
  )}°F`;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(
    (celciusFeelsLikeTemp * 9) / 5 + 32
  )}°F`;
}

let convertToFahrenheit = document.querySelector("#fahrenheit-temp");
convertToFahrenheit.addEventListener("click", convertToFahrenheitTemp);

window.onload = getCurrentLocation;
