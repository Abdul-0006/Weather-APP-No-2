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
    weatherStatus.textContent = "Please enter a city.";
  }
});

tempUnitToggle.addEventListener("change", () => {
  if (celsiusTemp === undefined) return;

  if (tempUnitToggle.checked) {
    temp.textContent = Math.round((celsiusTemp * 9) / 5 + 32);
    feelsLikeTemp.textContent = `${Math.round((celsiusFeelsLike * 9) / 5 + 32)}°F`;
    tempUnit.textContent = "°F";
  } else {
    temp.textContent = celsiusTemp;
    feelsLikeTemp.textContent = `${celsiusFeelsLike}°C`;
    tempUnit.textContent = "°C";
  }
});

const getData = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);

    if (!response.ok) throw new Error("City not found");

    let data = await response.json();
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
    temp.textContent = celsiusTemp;
    feelsLikeTemp.textContent = `${celsiusFeelsLike}°C`;
    weatherStatus.textContent = data.weather[0].description;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = `${data.main.humidity}%`;
  } catch (error) {
    weatherStatus.textContent = "Could not find that city.";
  }
};
