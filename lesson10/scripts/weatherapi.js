// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = `https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=425e98277e11c52c45f3883458535669`

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
        console.log(data); // this is for testing the call
        // displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
apiFetch();

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = capitalizeWords(desc);
}

function capitalizeWords(str) {
    let words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = word.substring(0, 1).toUpperCase() + word.substring(1);
    }
    return words.join(' ');
}