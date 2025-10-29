const apiKey = process.env.WEATHER_API_KEY;
const city = "Astana";
const weatherContainerTemp = document.querySelector(".weather-container__temperature");
const weatherElement = document.querySelector(".weather-container__value");
const cityNameElement = document.querySelector(".weather-container__city");

cityNameElement.innerHTML = city;

//проверка кэша - чтобы не было частых запросов
const CACHE_TIME = 60 * 60 * 1000; // 20 минут
const cacheKey = `weather_${city}`;

const cachedData = localStorage.getItem(cacheKey);
const cachedTime = localStorage.getItem(`${cacheKey}_timestamp`);

//проверяю кэш
if (cachedData && cachedTime && Date.now() - cachedTime < CACHE_TIME) {
  weatherElement.innerHTML = JSON.parse(cachedData);
  weatherElement.classList.remove("weather-loading");
  console.log("Обновление погоды не требуется");
} else {
  console.log("Погода обновлена");

  fetch(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      //проверяю, есть ли ошибки от самого сервиса
      if (data.error) {
        throw new Error(`Weatherstack error: ${data.error.info}`);
      }

      //проверяю, есть ли current в ответе и есть ли температура
      if (!data.current || typeof data.current.temperature !== "number") {
        throw new Error("Weather data missing");
      }
      const weather = data.current;
      weatherElement.innerHTML = weather.temperature;

      //сохраняю кэш
      localStorage.setItem(cacheKey, JSON.stringify(weather.temperature));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now());
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error.message);
      weatherContainerTemp.classList.add("weather-message");
      weatherContainerTemp.innerHTML = "Температура<br>недоступна";
    })
    .finally(() => {
      weatherElement.classList.remove("weather-loading");
    });
}
