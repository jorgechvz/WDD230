/* Function for time */
time = function (decision){
    const time = new Date();
    let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (decision === "headerTime"){
        return `${weekDays[time.getDay()]}, ${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}`;
    } else if (decision === "copyright"){
        return `${time.getFullYear()}`;
    } 
}
function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;
document.querySelector(".header_time").innerHTML = time("headerTime");
document.querySelector(".copyright_year").innerHTML = time("copyright");
document.querySelector(".last_updated").innerHTML = new Date(document.lastModified).toLocaleString("en-US");

