const url = `https://api.openweathermap.org/data/2.5/weather?q=Arequipa&units=metric&appid=01d4fef5cd620e8975b247534684ac76`
let temperature = document.querySelector(".temperature");
let windSpeed = document.querySelector(".container_windspeed");
let weatherIcon = document.querySelector(".weatherIcon");
let weatherDesc = document.querySelector(".weather_time");

async function apiWeather() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayData(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiWeather();

function displayData(weatherData){
  // Weather Icon
  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt',desc)
  // Weather Description
  weatherDesc.innerHTML = `${capitalizeWords(desc)}`;
  // Temperature and Wind Speed
  temperature.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong><span>&deg;C</span>`;
  windSpeed.innerHTML = `<p>Wind Speed: <span class="windSpeed">${weatherData.wind.speed}</span> Km/h</p>`;
  // Get the temperature and wind speed input values
  let temperatureValue = parseFloat(weatherData.main.temp.toFixed(0));
  let windSpeedValue = parseFloat(weatherData.wind.speed.toFixed(2));
  // Convert the temperature to Fahrenheit
  temperatureValue = (temperatureValue * 9/5) + 32;
  // Check if the input values meet the specification limits
  if (temperatureValue <= 50 && windSpeedValue > 3.0) {
    // Calculate the wind chill factor
    let windChillFactor = 35.74 + 0.6215 * temperatureValue - 35.75 * Math.pow(windSpeedValue, 0.16) + 0.4275 * temperatureValue * Math.pow(windSpeedValue, 0.16);
    // Display the wind chill factor value
    document.querySelector(".windChill").innerHTML =`${windChillFactor.toFixed(2)}°F`;
  } else {
    // Display "N/A" if the input values did not meet the requirements
    document.querySelector(".windChill").innerHTML = "N/A";
  }
}

function capitalizeWords(str) {
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word.substring(0, 1).toUpperCase() + word.substring(1);
  }
  return words.join(' ');
}
