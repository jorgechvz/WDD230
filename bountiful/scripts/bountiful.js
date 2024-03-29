/* Navbar Scripts */

const navContainer = document.querySelector(".navbar-container");
const logo = document.querySelector(".hideLogo-container");
const logoLink = document.querySelector(".logo_link");
const nav = document.querySelector(".nav-links");
const burger = document.querySelector(".burger");
const navLinks = document.querySelectorAll(".nav-links a");
const moveLogo = () =>{
    if (window.innerWidth < 1024){
        logo.innerHTML = `
          <a class="logo_link" href="index.html">
            <img class="logo_img" src="images/logo_boutiful_foods.svg" alt="Bountiful Logo Header"> 
          </a>
        `;    
    }else{
        logo.innerHTML = ``;
    }
}
/* Add Class Active */
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < navLinks.length; i++) {
      if (navLinks[i].href === window.location.href) {
        navLinks[i].classList.add('active');
        if(logoLink){
          logoLink.classList.remove('active');
        }
      }
    }
});
window.addEventListener('resize', moveLogo);
moveLogo();
const navSlide = () => {
    burger.addEventListener("click", () => {
        nav.classList.toggle('nav-active');
        nav.classList.toggle('nav-transition');
        
        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
          }
        });
        burger.classList.toggle("toggle");
        setTimeout(() => {
            nav.classList.toggle('nav-transition');
        }, 500);
    });
}; 
navSlide();

/* Footer */
const copyrightYear = document.querySelector(".year_copyright");
const lastModified = document.querySelector(".last_modified")
copyrightYear.innerHTML = `${new Date().getFullYear()}`;
lastModified.innerHTML = `Last Modified: ${new Date(document.lastModified).toLocaleString("en-UK")}`

/* Lazyload */
const imagesToLoad = document.querySelectorAll("img[data-src]");
const imagesOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
}

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {image.removeAttribute('data-src')};
}

if ("IntersectionObserver" in window) 
{
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    },imagesOptions);
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
} else 
{
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
}

/* Home Page Scripts */

/* Weather Scripts */
function capitalizeWords(str) {
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word.substring(0, 1).toUpperCase() + word.substring(1);
  }
  return words.join(' ');
}
// Define the URLs for the current weather and forecast API calls
const current_weather_url = 'https://api.openweathermap.org/data/2.5/weather?id=5393212&units=metric&appid=01d4fef5cd620e8975b247534684ac76';
const forecast_weather_url = 'https://api.openweathermap.org/data/2.5/forecast?id=5393212&appid=425e98277e11c52c45f3883458535669&units=metric';
// Get references to the HTML elements where the weather information will be displayed
const currentWeather = document.querySelector('.weather_card');
const forecast = document.querySelector('.forecast_card');
// Fetch the current weather data and update the HTML with the information
fetch(current_weather_url)
  .then(response => response.json())
  .then(data => {
    // Extract the relevant information from the API response
    const currentTemp = data.main.temp.toFixed(0);
    const description = capitalizeWords(data.weather[0].description);
    const humidity = data.main.humidity;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;
    // Update the HTML with the current weather information
    if (currentWeather){
      currentWeather.innerHTML = `
        <h3>${capitalizeWords(data.name)}, ${data.sys.country}</h3>
        <img class="weatherIcon" src="${iconsrc}" alt="${desc}">
        <p>${currentTemp}°C</p>
        <p class="humidityParagraph"><img class="iconHumidity" src="images/humidity-icon.svg" alt="Humidity Icon"><span>${humidity}%</span></p>
        <p>${description}</p>
      `
    }
  })
  .catch(error => console.error(error));
// Fetch the forecast weather data and update the HTML with the information
fetch(forecast_weather_url)
  .then(response => response.json())
  .then(data => {
    // Define an array with the indices of the forecasts to be displayed
    const forecastsToShow = [8, 16, 24]; 
    // Create the list of forecasts that will be displayed on the page
    const forecastList = forecastsToShow.map(index => {
    const day = data.list[index];
    const date = new Date(day.dt_txt);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
    return `
      <div>
        <img class="weatherIcon" src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
        <p>${dayOfWeek}</p>
        <p>${day.main.temp_max.toFixed(0)}°C</p>
      </div>
    `;
    }).join('');
    // Update the HTML with the forecast information
    if(forecast){
      forecast.innerHTML = `
        ${forecastList}
      `;
    }
  })
  .catch(error => console.error(error));

// Add functionality to the "See more" and "See less" buttons
const seeMore = document.querySelector(".see-more");
const paragraphHide = document.querySelector(".paragraph-hide");
const seeLess = document.querySelector(".see-less");
function seeParagraph() {
  if (paragraphHide.style.display === "none") {
    paragraphHide.style.display = "block";
    seeMore.innerHTML = "";
    seeLess.innerHTML = "See less";
    seeLess.addEventListener("click", seeParagraph);
  } else {
    paragraphHide.style.display = "none";
    seeLess.innerHTML = "See less";
    seeMore.innerHTML = "See more...";
    seeLess.removeEventListener("click", seeParagraph);
  }
}
function addEvent(){
  if (window.innerWidth < 720){
    if (seeMore){
      seeMore.addEventListener("click", seeParagraph);
      seeMore.innerHTML = "See more...";
    }
    if (paragraphHide){
      paragraphHide.style.display = "none";
    }  
  } else {
      if (seeMore){
        seeMore.removeEventListener("click", seeParagraph);
      }
      if (paragraphHide){
        paragraphHide.style.display = "block";
      }
      if (seeLess){
        seeLess.innerHTML = "See less";
      }
  }
}
addEvent();
window.addEventListener("resize", addEvent);

/* Orders Script */
const orderForm = document.getElementById('order-form');
// Add event listener to the order form submit button
if (orderForm){
  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let submittedOrders = localStorage.getItem('submittedOrders');
    if (!submittedOrders) {
      submittedOrders = 0;
    }
    submittedOrders++;
    localStorage.setItem('submittedOrders', submittedOrders);
    updateOrdersCard();
  });
}
// Update the orders card with the number of submitted orders
function updateOrdersCard() {
  const ordersContainer = document.querySelector('.orders_container');
  let emptyCartOrders = document.querySelector(".empty-cart-orders");
  let ordersCard = document.querySelector(".card-orders");
  let submittedSpan = document.querySelector(".orders-submitted");
  let submittedOrders = localStorage.getItem('submittedOrders');
  if (!submittedOrders) {
    submittedOrders = 0;
  }
  if (ordersContainer){
    if (submittedOrders === 0){
      ordersCard.style.display = "none";
    } else {
      emptyCartOrders.style.display = "none";
      submittedSpan.innerHTML = submittedOrders;
    }
  }
}
// Call updateOrdersCard() function when the page is loaded
window.addEventListener('load', function() {
  updateOrdersCard();
});

/* Contact Page Scripts */

// Select form and submit button elements
const formContact = document.querySelector('.form-contact');
const submitButton = document.querySelector('.btn_contact');
// Create a message element and add it to the form
const message = document.createElement('span');
message.className = "message-submit";
message.style.display = 'none';
message.textContent = 'Thanks for sending us a message. 😊';
if (submitButton){
  submitButton.parentNode.insertBefore(message, submitButton.nextSibling);
}
// Add event listener to the contact form submit button
if (formContact){
  formContact.addEventListener('submit', (event) => {
    event.preventDefault();
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 5000);
    formContact.reset();
  });
}

