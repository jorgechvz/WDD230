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