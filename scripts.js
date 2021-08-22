let now = new Date();

let day = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let hour = now.getHours();
let minute = now.getMinutes();
let time = now.getTime(); // unix time  in milliseconds
let timeOffset = now.getTimezoneOffset() * 60000; // get timezone offset and convert from minutes to milliseconds

function getFullMinutes() {
  if (minute < 10) {
    return "0" + minute;
  }
  return minute;
} // to make sure minute is always 2 digits

function getFullHour() {
  if (hour < 10) {
    return "0" + hour;
  }
  return hour;
} // to make sure hour is always 2 digits

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let formatedTime = document.querySelector(".current-time");
formatedTime.innerHTML = `${days[day]}, ${
  months[month]
} ${date} ${getFullHour()}:${getFullMinutes()}`; //formarted date

function showWeatherForecast(response) {
  console.log(response);

  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  days.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML += `
              <div class="col-2">
                <strong>${day}</strong>
                <img
                  src="http://openweathermap.org/img/wn/10n@2x.png"
                  id="mini-weather-icon"
                  alt="Clear"
                />
                30°C 40°C
              </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getWeatherForecast(coordinates) {
  let apiKey = "6205aed09d3502bfb77cd3492c5fda5d";
  let apiUrl3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;

  axios.get(apiUrl3).then(showWeatherForecast);
}

function showTemperatureInfo(response) {
  celciusTemp = response.data.main.temp;
  celciusFeelsLikeTemp = response.data.main.feels_like;
  windSpeedInMeter = response.data.wind.speed;
  visibilityInMeter = response.data.visibility;

  document.querySelector(".searched-city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#current-temp").innerHTML = `${Math.round(celciusTemp)}°C`;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(celciusFeelsLikeTemp)}°C`;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = `${Math.round(windSpeedInMeter * 3.6)} km/h`; // convert from m/s to km/h
  document.querySelector("#visibility").innerHTML = `${Math.round(
    ((visibilityInMeter / 1000) * 10) / 10
  )} km`; // convert from m/s to km/h

  let sunriseTime = new Date(
    response.data.sys.sunrise * 1000 + response.data.timezone * 1000 + timeOffset
  );
  let sunsetTime = new Date(
    response.data.sys.sunset * 1000 + response.data.timezone * 1000 + timeOffset
  );
  document.querySelector("#sunrise").innerHTML = sunriseTime.toLocaleTimeString([], {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  });
  document.querySelector("#sunset").innerHTML = sunsetTime.toLocaleTimeString([], {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  });

  getWeatherForecast(response.data.coord);
}

function showCurrentLocation(response) {
  document.querySelector(".current-location").innerHTML = response.data.name;
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
  axios.get(apiUrl2).then(showCurrentLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let celciusTemp = null;
let celciusFeelsLikeTemp = null;
let windSpeedInMeter = null;
let visibilityInMeter = null;

function displayCelsiusTemp(event) {
  // this function display the API response in metric units
  event.preventDefault();
  convertToFahrenheit.classList.remove("active");
  convertToCelsius.classList.add("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round(celciusTemp)}°C`;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(celciusFeelsLikeTemp)}°C`;
  document.querySelector("#wind").innerHTML = `${
    Math.round(windSpeedInMeter * 3.6 * 10) / 10
  } km/h`; // convert from m/s to km/h and round to 1 decimal place
  document.querySelector("#visibility").innerHTML = `${
    Math.round((visibilityInMeter / 1000) * 10) / 10
  } km`; // convert from m/s to km/h and round to 1 decimal place
}

let convertToCelsius = document.querySelector("#celsius-temp");
convertToCelsius.addEventListener("click", displayCelsiusTemp);

function convertToFahrenheitTemp(event) {
  // this function converts metric units to imperial units
  event.preventDefault();
  convertToCelsius.classList.remove("active");
  convertToFahrenheit.classList.add("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round((celciusTemp * 9) / 5 + 32)}°F`;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(
    (celciusFeelsLikeTemp * 9) / 5 + 32
  )}°F`;
  document.querySelector("#wind").innerHTML = `${
    Math.round(windSpeedInMeter * 2.237 * 10) / 10
  } mph`; // convert from m/s to mph and round to 1 decimal place
  document.querySelector("#visibility").innerHTML = `${
    Math.round((visibilityInMeter / 1609) * 10) / 10
  } mi`; // convert from m to mile and round to 1 decimal place
}

let convertToFahrenheit = document.querySelector("#fahrenheit-temp");
convertToFahrenheit.addEventListener("click", convertToFahrenheitTemp);

window.onload = getCurrentLocation;
