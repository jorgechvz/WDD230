/* Get the current Year */

let currentYear = new Date;
document.querySelector(".copyright_year").innerHTML = currentYear.getFullYear();

/* Code for Question's Accordion */

let accordion = document.getElementsByClassName("accordion");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } 
    else {
      panel.style.display = "block";
    }
  });
}

