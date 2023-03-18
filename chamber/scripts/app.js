// Global Variables
const urlData = "https://raw.githubusercontent.com/jorgechvz/WDD230/master/chamber/JSON/data.json";

// Global Functions
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

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

/* DOM for Navbar*/
const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;
document.querySelector(".header_time").innerHTML = functionTime("headerTime");
document.querySelector(".copyright_year").innerHTML = functionTime("copyright");
document.querySelector(".last_updated").innerHTML = new Date(document.lastModified).toLocaleString("en-UK");


/* For the display Event only monday and tuesday */
const eventSection = document.querySelector(".event_section");
const weatherSection = document.querySelector(".weather_section");
const newsSection = document.querySelector(".news_section");
const joinSection = document.querySelector(".join_section");
const currentDay = new Date().getDay();
if(eventSection !== null){
    if (currentDay !== 1 && currentDay !== 2) {
        eventSection.style.display = "none";
    } else{
        weatherSection.classList.add('weather_section-grid');
        newsSection.classList.add('news_section-grid');
        joinSection.classList.add('join_section-grid');
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
        const membershipLevelInput = document.getElementById("membership-level");
        membershipLevelInput.value = selectedMembership;
    }
  }
});

if (joinForm){
    joinForm.addEventListener("submit", function() {
      localStorage.removeItem("selectedMembership");
    });
};

if (formLoadedTimeInput){
    formLoadedTimeInput.value = time.toLocaleString("en-UK");
};  

/* Directory Page Scripts */
// We use an "if" so that this code is only used when you are on the directory page
if (window.location.pathname.includes("/chamber/directory.html")){
  const gridbutton = document.querySelector(".grid-button");
  const listbutton = document.querySelector(".list-button");
  const display = document.querySelector("#directory_container");
  
  async function getDirectoryData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayDirectory(data.directory);
    
  }
  // Call the async fucntion getDirectoryData  
  getDirectoryData(urlData);
  
  const displayDirectory = (directory) => {
      let directoryCard = document.querySelector("#directory_container");
      directory.forEach((directoryItem) => {
        let card = document.createElement('section');
        let imgDirectory = document.createElement('img');
        imgDirectory.className = "icon-directory"
        imgDirectory.setAttribute("src",directoryItem.image);
        imgDirectory.setAttribute("alt",`Icon for ${directoryItem.name}`);
        imgDirectory.setAttribute('loading', 'lazy');
        card.innerHTML =`
            <div>
                <h2>${directoryItem.name}</h2>
                <p>${directoryItem.address}</p>
                <p>${directoryItem.phone}</p>
                <p>Membership: ${capitalize(directoryItem.membership)}</p>
                <a href="${directoryItem.website}">${directoryItem.website}</a>
            </div>
        `
        if(card){
          card.appendChild(imgDirectory);
        }
        if(directoryCard){
          directoryCard.appendChild(card);
        }
      });
  }
  if (gridbutton){
    gridbutton.addEventListener("click", () => {
      display.classList.add("grid_container");
      display.classList.remove("list_container");
    });
  }
  if (listbutton)
  {
    listbutton.addEventListener("click", () => {
      display.classList.add("list_container");
      display.classList.remove("grid_container");
    });
  }
}

/* Home Page Scripts */
// We use an "if" so that this code is only used when you are on the home page in the section spotlight
if (window.location.pathname.includes("/chamber/index.html")){ 
  /* Spotlight Data */
  async function getSpotlightData(url) 
  {
    const response = await fetch(url);
    const data = await response.json();
    const filteredDirectory  = data.directory.filter((item) =>{
      return (item.membership === 'gold' || item.membership === 'silver');
    })
    const selectedCompanies = [];
    while (selectedCompanies.length < 3 && filteredDirectory.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredDirectory.length);
      const randomCompany = filteredDirectory.splice(randomIndex, 1)[0];
      selectedCompanies.push(randomCompany);
    }
    displaySpotlight(selectedCompanies);
  }
  // Call the async fucntion getSpotlightData 
  getSpotlightData(urlData);

  // Display Spotlight data in index.hmtl
  const displaySpotlight = (spotlight) => {
    let sectionSpotlight = document.querySelector(".spotlight_section");
    spotlight.forEach((spotItem,index) =>{
      let divSpot = document.createElement('div') 
      divSpot.className = `spotlight${index+1}`;
      divSpot.innerHTML = `
        <h2>${spotItem.name}</h2>
        <img src="${spotItem.image}" alt="${spotItem.name} Logo Image">
        <p>"${spotItem.banner}"</p>
        <hr>
        <a href="mailto:${spotItem.email}">${spotItem.email}</a>
        <p>${spotItem.phone}</p>
      `
      if (sectionSpotlight){
        sectionSpotlight.appendChild(divSpot);
      }
    })
  }
};

/* Contact Page Scripts */
// Modal
if(window.location.pathname.includes("/chamber/contact.html")){
  let formContact = document.querySelector('.form-contact');
  if(formContact){
    formContact.addEventListener('submit', function(event) {
      event.preventDefault();
      let modal = document.getElementById('modal');
      modal.style.display = 'block';
      setTimeout(function() {
        modal.style.display = 'none';
      }, 3000); 
      formContact.reset();
    });
    
    function scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
}
