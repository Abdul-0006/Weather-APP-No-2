const apiKey = "0d9f253a4000b6c1636430e7cd101eec";

let userSearch = document.querySelector("#citySearch");
let searchForm = document.querySelector("#searchForm");

let weatherIcon = document.querySelector("#weatherImage");
let cityName = document.querySelector("#cityName");
let date = document.querySelector("#weatherDate");
let temp = document.querySelector("#temperatureValue");
let tempUnit = document.querySelector("#temperatureUnit");
let weatherStatus = document.querySelector("#weatherStatus");
let feelsLikeTemp = document.querySelector("#feelsLikeValue");
let windSpeed = document.querySelector("#windSpeed");
let humidity = document.querySelector("#humidity");
let tempUnitToggle = document.querySelector("#fahrenheitToggle");
let celsiusTemp;
let celsiusFeelsLike;

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let inputValue = userSearch.value.trim();
  if (inputValue) {
    getData(inputValue);
  } else {
    clearWeatherData();
    weatherStatus.textContent = "Please enter a city";
  }
});

let clearWeatherData = () => {
  cityName.textContent = "";
  weatherIcon.removeAttribute("src");
  weatherIcon.removeAttribute("alt");
  date.textContent = "Today, date Month";
  temp.textContent = "";
  tempUnit.textContent = "°C";
  feelsLikeTemp.textContent = "";
  weatherStatus.textContent = "Enter a  city";
  humidity.textContent = "";
  windSpeed.textContent = "";
  tempUnitToggle.checked = false;
  celsiusTemp = undefined;
  celsiusFeelsLike = undefined;
};
tempUnitToggle.addEventListener("click", () => {
  if (celsiusTemp === undefined || celsiusFeelsLike === undefined) {
    tempUnitToggle.checked = false;
    return;
  }

  if (tempUnitToggle.checked) {
    temp.textContent = `${Math.round((celsiusTemp * 9) / 5 + 32)}`;
    tempUnit.textContent = " °F";
    feelsLikeTemp.textContent = `${Math.round((celsiusFeelsLike * 9) / 5 + 32)} °F`;
  } else {
    temp.textContent = Math.round(celsiusTemp);
    tempUnit.textContent = "°C";
    feelsLikeTemp.textContent = `${Math.round(celsiusFeelsLike)}°C`;
  }
});
const getData = async (city) => {
  clearWeatherData();

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    if (!response.ok) throw new Error("Could not find the city");

    const weatherDate = new Date(data.dt * 1000);

    cityName.textContent = data.name;
    weatherIcon.src = `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].description;
    date.textContent = weatherDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    celsiusTemp = data.main.temp;
    celsiusFeelsLike = data.main.feels_like;
    temp.textContent = Math.round(celsiusTemp);
    feelsLikeTemp.textContent = `${Math.round(celsiusFeelsLike)}°C`;
    weatherStatus.textContent = data.weather[0].description;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = `${data.main.humidity}%`;
  } catch {
    clearWeatherData();
    weatherStatus.textContent = "Could not find that city, enter a valid city";
  }
};
