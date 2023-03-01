/* Function for time */
const time = new Date();
const functionTime = function (decision){
    let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (decision === "headerTime"){
        return `${weekDays[time.getDay()]}, ${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}`;
    } else if (decision === "copyright"){
        return `${time.getFullYear()}`;
    } 
}
/* Function to Navbar */
function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

/* DOM */
const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;
document.querySelector(".header_time").innerHTML = functionTime("headerTime");
document.querySelector(".copyright_year").innerHTML = functionTime("copyright");
document.querySelector(".last_updated").innerHTML = new Date(document.lastModified).toLocaleString("en-UK");

/* For the display Event only monday and tuesday */

const eventSection = document.querySelector(".event_section");
const mainSection = document.querySelector("main");
const weatherSection = document.querySelector(".weather_section");
const heroSection = document.querySelector(".hero_section");
const newsSection = document.querySelector(".news_section");
const spotlightSection = document.querySelector(".spotlight_section");
const joinSection = document.querySelector(".join_section");
const imageJoin = document.querySelector(".join_image");
const currentDay = new Date().getDay();
if(eventSection !== null){
    if (currentDay !== 1 && currentDay !== 2) {
        eventSection.style.display = "none";
    } else{
        weatherSection.classList.add('weather_section-grid');
        heroSection.classList.add('hero_section-grid');
        newsSection.classList.add('news_section-grid');
        spotlightSection.classList.add('spotlight_section-grid');
        joinSection.classList.add('join_section-grid');
        imageJoin.classList.add('image_section-grid');
        mainSection.classList.add('main-grid');
    }
}
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

/* Scripts for Thank You Page */
let countThankYou = 20;
let countdownThankYou = setInterval(function() {
  countThankYou--;
  let count = document.getElementById("countdown");
  if (count) {
    count.innerHTML = countThankYou;
  }
  if (countThankYou == 0 && window.location.pathname.includes("/chamber/thankyou.html")) {
    clearInterval(countdownThankYou);
    window.location.href = "index.html";
  }
}, 1000);



/* Join Page */
const membershipCardsContainer = document.getElementById("membership-cards-container");
const joinForm = document.querySelector("#join-form-container");
const myForm = document.querySelector(".join-form");
const formLoadedTimeInput = document.getElementById('form-loaded-time');
if (membershipCardsContainer){
    membershipCardsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("select-membership")) {
        membershipCardsContainer.style.display = "none";
        joinForm.style.display = "block";
        const membershipLevelInput = document.getElementById("membership-level");
        const selectedMembership = event.target.getAttribute("data-membership");
        membershipLevelInput.value = selectedMembership;
        localStorage.setItem("selectedMembership", selectedMembership);
    }
    });
}

window.addEventListener("load", function() {
  const selectedMembership = localStorage.getItem("selectedMembership");
  if (selectedMembership) {
    if (joinForm){
        joinForm.style.display = "none";
        const membershipLevelInput = document.getElementById("membership-level");
        membershipLevelInput.value = selectedMembership;
    }
  }
});

if (joinForm){
    joinForm.addEventListener("submit", function() {
      localStorage.removeItem("selectedMembership");
    });
}

if (formLoadedTimeInput){
    formLoadedTimeInput.value = time.toLocaleString("en-UK");
}  